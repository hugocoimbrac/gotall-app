package com.gotall.app.wear

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.wear.compose.material3.Button
import androidx.wear.compose.material3.MaterialTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { GotAllWear() }
    }
}

private enum class WearScreen { HOME, COUNTING, DONE }

@Composable
fun GotAllWear() {
    val items = remember { listOf("PHONE", "WALLET", "KEYS", "WATCH", "DOOR", "WINDOWS", "LIGHTS") }
    var screen by remember { mutableStateOf(WearScreen.HOME) }
    var index by remember { mutableIntStateOf(0) }

    MaterialTheme {
        Box(
            modifier = Modifier.fillMaxSize().background(Color.Black).padding(14.dp),
            contentAlignment = Alignment.Center
        ) {
            when (screen) {
                WearScreen.HOME -> Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("YOUR NUMBER", color = Color.Gray, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text(items.size.toString(), color = Color.White, fontSize = 76.sp, fontWeight = FontWeight.Black)
                    Spacer(Modifier.height(6.dp))
                    Button(onClick = { index = 0; screen = WearScreen.COUNTING }) {
                        Text("I'M LEAVING", fontWeight = FontWeight.Bold, textAlign = TextAlign.Center)
                    }
                }
                WearScreen.COUNTING -> Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("${index + 1} / ${items.size}", color = Color.Gray, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    Spacer(Modifier.height(12.dp))
                    Text(items[index], color = Color.White, fontSize = 25.sp, fontWeight = FontWeight.Black, textAlign = TextAlign.Center)
                    Spacer(Modifier.height(16.dp))
                    Button(
                        onClick = {
                            if (index == items.lastIndex) screen = WearScreen.DONE else index++
                        },
                        modifier = Modifier.size(66.dp).clip(CircleShape)
                    ) { Text("✓", fontSize = 28.sp, fontWeight = FontWeight.Black) }
                    Spacer(Modifier.height(7.dp))
                    Text("TAP TO CONFIRM", color = Color.Gray, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                }
                WearScreen.DONE -> Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("✓", color = Color.White, fontSize = 58.sp, fontWeight = FontWeight.Black)
                    Text("GOT ALL.", color = Color.White, fontSize = 21.sp, fontWeight = FontWeight.Black)
                    Spacer(Modifier.height(12.dp))
                    Button(onClick = { screen = WearScreen.HOME }) { Text("DONE", fontWeight = FontWeight.Bold) }
                }
            }
        }
    }
}
