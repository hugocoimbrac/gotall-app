const { withAndroidManifest, withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function write(file, content) { ensureDir(path.dirname(file)); fs.writeFileSync(file, content); }

function withManifest(config) {
  return withAndroidManifest(config, config => {
    const manifest = config.modResults.manifest;
    const app = manifest.application && manifest.application[0];
    if (!app) return config;

    app.$ = app.$ || {};
    app.$['android:icon'] = '@drawable/gotall_launcher';
    app.$['android:roundIcon'] = '@drawable/gotall_launcher';

    app.receiver = app.receiver || [];
    const exists = app.receiver.some(r => r.$ && r.$['android:name'] === '.GotAllWidget');
    if (!exists) {
      app.receiver.push({
        $: {
          'android:name': '.GotAllWidget',
          'android:exported': 'false'
        },
        'intent-filter': [{ action: [{ $: { 'android:name': 'android.appwidget.action.APPWIDGET_UPDATE' } }] }],
        'meta-data': [{ $: {
          'android:name': 'android.appwidget.provider',
          'android:resource': '@xml/gotall_widget_info'
        }}]
      });
    }
    return config;
  });
}

function withNativeFiles(config) {
  return withDangerousMod(config, ['android', async config => {
    const root = config.modRequest.platformProjectRoot;
    const main = path.join(root, 'app', 'src', 'main');
    const res = path.join(main, 'res');
    const pkgPath = path.join(main, 'java', 'com', 'gotall', 'app');

    write(path.join(pkgPath, 'GotAllWidget.kt'), `package com.gotall.app

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.RemoteViews

class GotAllWidget : AppWidgetProvider() {
    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        appWidgetIds.forEach { appWidgetId ->
            val views = RemoteViews(context.packageName, R.layout.gotall_widget)
            val intent = Intent(context, MainActivity::class.java).apply {
                action = Intent.ACTION_VIEW
                data = Uri.parse("gotall://leaving")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }
            val pendingIntent = PendingIntent.getActivity(
                context,
                1001,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.gotallWidgetRoot, pendingIntent)
            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}
`);

    write(path.join(res, 'layout', 'gotall_widget.xml'), `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/gotallWidgetRoot"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/gotall_widget_bg"
    android:gravity="center_vertical"
    android:orientation="vertical"
    android:paddingLeft="20dp"
    android:paddingTop="14dp"
    android:paddingRight="20dp"
    android:paddingBottom="14dp">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="GOTALL"
        android:textColor="#AFAFAF"
        android:textSize="11sp"
        android:textStyle="bold"
        android:letterSpacing="0.18" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="6dp"
        android:text="I'M LEAVING  →"
        android:textColor="#FFFFFF"
        android:textSize="18sp"
        android:textStyle="bold" />
</LinearLayout>
`);

    write(path.join(res, 'drawable', 'gotall_widget_bg.xml'), `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
    <solid android:color="#050505" />
    <corners android:radius="22dp" />
</shape>
`);

    write(path.join(res, 'xml', 'gotall_widget_info.xml'), `<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="180dp"
    android:minHeight="64dp"
    android:targetCellWidth="4"
    android:targetCellHeight="1"
    android:updatePeriodMillis="0"
    android:initialLayout="@layout/gotall_widget"
    android:resizeMode="horizontal"
    android:widgetCategory="home_screen"
    android:description="@string/app_name" />
`);

    write(path.join(res, 'drawable', 'gotall_launcher.xml'), `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path android:fillColor="#000000" android:pathData="M0,0H108V108H0Z" />
    <path android:fillColor="@android:color/transparent" android:strokeColor="#FFFFFF" android:strokeWidth="8" android:strokeLineCap="round" android:pathData="M24,48 C25,35 35,25 48,24" />
    <path android:fillColor="@android:color/transparent" android:strokeColor="#FFFFFF" android:strokeWidth="8" android:strokeLineCap="round" android:pathData="M60,24 C73,25 83,35 84,48" />
    <path android:fillColor="@android:color/transparent" android:strokeColor="#FFFFFF" android:strokeWidth="8" android:strokeLineCap="round" android:pathData="M84,60 C83,73 73,83 60,84" />
    <path android:fillColor="@android:color/transparent" android:strokeColor="#FFFFFF" android:strokeWidth="8" android:strokeLineCap="round" android:pathData="M48,84 C35,83 25,73 24,60" />
    <path android:fillColor="#FFFFFF" android:pathData="M54,45 A9,9 0,1 0,54,63 A9,9 0,1 0,54,45" />
</vector>
`);

    return config;
  }]);
}

module.exports = function withGotAllAndroid(config) {
  config = withManifest(config);
  config = withNativeFiles(config);
  return config;
};
