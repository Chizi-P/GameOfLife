# Game Of Life

### 康威生命遊戲

有對一些穩定狀態、振盪狀態、會移動的振盪狀態進行著色標記，但並不全面。

之後有時間會弄成class。

[展示網址](https://chizi-p.github.io/GameOfLife/)

[js代碼](https://github.com/Chizi-P/GameOfLife/blob/master/GameOfLife/Game_of_life.js)

##### ! 未完全可用



## 說明

#### 開天闢地

```javascript
function bigBang(width, height);
```

創造一個直角空間 `space` 給生命

全域變數 `spaceW` 空間寬度 = `width`

全域變數 `spaceH` 空間高度 = `height`

---

#### 生命起源

```javascript
function createLife(x, y);
```

`x` , `y` 在生成的直角座標空間中（x, y）位置創造生命

---

#### 遍地開花

```javascript
function randomCreateLife(density, isClear = true);
```

`density`  設定隨機生成的生命數目次數

`isClear` 是否清除之前的所有生命（默認清除全部生命）

---

#### 殺生

```javascript
function killLife(x, y);
```

殺死（x, y）位置的生命

---

#### 時間流逝

```javascript
function timeForward();
```

根據世界規矩先前運行一時間單位

```javascript
function run(delay, times, isDisplay = false);
```

世界持續運行

`delay` 每次執行的間距時間，輸入單位為毫秒

`times` 重複執行次數

`isDisplay` 是否把每次情況顯示在console上

全域變數 `isRun` = `true`

---

#### 時間停止

```javascript
function stop();
```

停止時間

全域變數 `isRun` = `false`

---

#### Console 顯示

```javascript
function display();
```

在console中顯示現在的空間樣貌。

---

#### 基本著色標記

```javascript
function baseColoringMark();
```

用顏色標記「穩定狀態」、「振盪狀態」、「會移動的振盪狀態」。

##### 暫時不全面

---

#### 著色標記

```javascript
function coloringMark(stateMap, mark, isRotate = false);
```

`stateMap` 放入各狀態二維矩陣的三維矩陣。

`mark` 標記的數值

`isRotate` 是否自動旋轉入的 `stateMap` 以4個方向做著色標記（默認不旋轉）







