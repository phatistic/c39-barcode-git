namespace SpriteKind {
    export const KeyBoard = SpriteKind.create()
    export const Barcode = SpriteKind.create()
}
function SliceText (Text: string, Sidx: number) {
    txt = ""
    for (let i = 0; i <= Text.length - 1; i++) {
        if (i != Sidx) {
            txt = "" + txt + Text.charAt(i)
        }
    }
    return txt
}
function c39DrawCode39ResultEncode (AndText: boolean, Hight: number, GapWidth: number, GapHight: number, Bcol: number, Wcol: number) {
    c39ImageEncode = image.create(c39SumTheNumList(c39Lwidth), Hight)
    c39ImageEncode.fill(Wcol)
    c39WidthI = 0
    c39i3 = 0
    for (let value of c39Lpin) {
        for (let c39j = 0; c39j <= value.length - 1; c39j++) {
            if (parseFloat(value.charAt(c39j)) > 0) {
                c39ImageEncode.fillRect(c39WidthI + c39j, 0, 1, Hight - 8, Bcol)
                if (!(AndText)) {
                    c39ImageEncode.fillRect(c39WidthI + c39j, 0, 1, Hight, Bcol)
                }
            }
        }
        if (AndText) {
            images.print(c39ImageEncode, c39ListText[c39i3], c39WidthI + (value.length / 2 - 3), Hight - 8, Bcol)
        }
        c39WidthI += value.length
        c39i3 += 1
    }
    c39bgImage = image.create(GapWidth * 2 + c39SumTheNumList(c39Lwidth), GapHight * 2 + Hight)
    c39bgImage.fill(Wcol)
    spriteutils.drawTransparentImage(c39ImageEncode, c39bgImage, GapWidth, GapHight)
return c39bgImage
}
function SetupKeyBoardOfC39 () {
    c39KeyBoard = [
    [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "$"
    ],
    [
    "-",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "/"
    ],
    [
    ".",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "+"
    ],
    [
    "^",
    "_",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "%"
    ]
    ]
}
function c39WriteUpperTextToCode39 (c39UpperText: string) {
    if (c39CheckTextIsGotUndefind(c39UpperText)) {
        return false
    }
    c39myText = c39UpperText
    c39ListText = c39SetListAsText(c39myText)
    c39NumIdxList = c39deTextListToIdxList(c39ListText)
    c39myText = "*" + c39myText + "*"
    c39ListText = c39SetListAsText(c39myText)
    c39NumIdxList = c39deTextListToIdxList(c39ListText)
    return true
}
function c39CheckTextIsGotUndefind (c39Text: string) {
    for (let c39i = 0; c39i <= c39Text.length - 1; c39i++) {
        c39idx = c39table[0].indexOf(c39Text.charAt(c39i))
        if (c39idx >= c39table[0].length - 1 || c39idx < 0) {
            return true
        }
    }
    return false
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (WriteYourSelf) {
        Ckey = c39KeyBoard[CursorPos[1]][CursorPos[0]]
        if (c39table[0].indexOf(Ckey) >= 0) {
            MyText = "" + MyText + Ckey
            KeyIdx += 1
        } else {
            if (Ckey == "_") {
                MyText = "" + MyText + " "
                KeyIdx += 1
            } else {
                c39GettingReadyToEncodeToCode39(MyText)
                WriteYourSelf = false
                if (KeyBoardSprite) {
                    sprites.destroy(KeyBoardSprite)
                    KeyBoardSprite = spriteutils.nullConsts(spriteutils.NullConsts.Undefined)
                }
            }
        }
    } else {
        c39GettingReadyToEncodeToCode39(c39GeneratingC39UpperText(8, 16))
    }
})
function c39GeneratingC39UpperText (Min: number, Max: number) {
    c39Utxt = ""
    for (let index = 0; index < randint(Min, Max); index++) {
        c39Utxt = "" + c39Utxt + c39table[0][randint(0, c39table[0].length - 2)]
    }
    return c39Utxt
}
function GetKeyHoldFrame (Pressed: boolean, KeyID: number, Rem: number) {
    if (Pressed) {
        KeyHoldFrame[KeyID] = KeyHoldFrame[KeyID] + 1
        if (KeyHoldFrame[KeyID] % Rem > 0) {
            return false
        }
        return true
    }
    KeyHoldFrame[KeyID] = 0
    return false
}
spriteutils.createRenderable(0, function (screen2) {
    if (SetupDone) {
        if (KeyBoardSprite) {
            images.printCenter(screen2, "" + MyText + "|", scene.screenHeight() - (KeyBoardSprite.height + 10), 1)
        }
        spriteutils.drawTransparentImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, screen2, 0, 0)
    }
})
function c39SumTheNumList (c39NumListData: any[]) {
    c39count = 0
    for (let value2 of c39NumListData) {
        c39count += value2
    }
    return c39count
}
function c39SetListAsText (c39Text: string) {
    c39UtxtList = []
    for (let c39i2 = 0; c39i2 <= c39Text.length - 1; c39i2++) {
        c39UtxtList.push(c39Text.charAt(c39i2))
    }
    return c39UtxtList
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (WriteYourSelf) {
        if (MyText.isEmpty()) {
            if (KeyBoardSprite) {
                sprites.destroy(KeyBoardSprite)
                KeyBoardSprite = spriteutils.nullConsts(spriteutils.NullConsts.Undefined)
            }
            WriteYourSelf = false
        } else {
            MyText = SliceText(MyText, MyText.length - 1)
            KeyIdx += -1
        }
    } else {
        MyText = ""
        CursorPos = [0, 0]
        KeyIdx = 0
        if (!(KeyBoardSprite)) {
            KeyBoardSprite = sprites.create(RenderKeyBoard(10, 10, CursorPos[0], CursorPos[1]), SpriteKind.KeyBoard)
            KeyBoardSprite.scale = Math.round(scene.screenWidth() / 160)
            KeyBoardSprite.bottom = scene.screenHeight()
        }
        WriteYourSelf = true
    }
})
function c39deTextListToIdxList (c39txtList: string[]) {
    c39UnumList = []
    for (let value3 of c39txtList) {
        c39idx = c39table[0].indexOf(value3)
        c39UnumList.push(parseFloat(c39table[1][c39idx]))
    }
    return c39UnumList
}
function RenderKeyBoard (Col: number, Row: number, Cx: number, Cy: number) {
    KeyBoardImage = image.create(1 + Col * c39KeyBoard[0].length, 1 + Row * c39KeyBoard.length)
    KeyBoardImage.fill(15)
    for (let ki = 0; ki <= c39KeyBoard.length - 1; ki++) {
        for (let kj = 0; kj <= c39KeyBoard[0].length - 1; kj++) {
            KeyBoardImage.drawRect(Col * kj, Row * ki, Col + 1, Row + 1, 1)
            images.print(KeyBoardImage, c39KeyBoard[ki][kj], Col * kj + (Col / 2 - 3), Row * ki + (Row / 2 - 4), 1)
        }
    }
    KeyBoardImage.fillRect(Col * Cx, Row * Cy, Col + 1, Row + 1, 1)
    images.print(KeyBoardImage, c39KeyBoard[Cy][Cx], Col * Cx + (Col / 2 - 3), Row * Cy + (Row / 2 - 4), 15)
return KeyBoardImage
}
function c39GettingReadyToEncodeToCode39 (c39UpperText: string) {
    if (c39WriteUpperTextToCode39(c39UpperText)) {
        StartEncodeToCode39()
        BarcodeImage = c39DrawCode39ResultEncode(true, 100, 8, 8, scene.backgroundColor(), 1)
    }
}
function StartEncodeToCode39 () {
    c39Lpin = []
    c39Lwidth = []
    for (let value4 of c39NumIdxList) {
        c39Tval = c39table[2][value4]
        c39Lpin.push(c39Tval)
        c39Nval = c39Tval.length
        c39Lwidth.push(c39Nval)
    }
}
function SetupC39table () {
    c39table = [[
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "-",
    ".",
    " ",
    "$",
    "/",
    "+",
    "%",
    "*"
    ], [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43"
    ], [
    "010100110110010",
    "011010010100110",
    "010110010100110",
    "011011001010010",
    "010100110100110",
    "011010011010010",
    "010110011010010",
    "010100101100110",
    "011010010110010",
    "010110010110010",
    "01101010010110",
    "01011010010110",
    "01101101001010",
    "01010110010110",
    "01101011001010",
    "01011011001010",
    "01010100110110",
    "01101010011010",
    "01011010011010",
    "01010110011010",
    "01101010100110",
    "01011010100110",
    "01101101010010",
    "01010110100110",
    "01101011010010",
    "01011011010010",
    "01010101100110",
    "01101010110010",
    "01011010110010",
    "01010110110010",
    "01100101010110",
    "01001101010110",
    "01100110101010",
    "01001011010110",
    "01100101101010",
    "01001101101010",
    "01001010110110",
    "01100101011010",
    "01001101011010",
    "0101001010010",
    "010101001010",
    "010101010010",
    "010010101010",
    "01001011011010"
    ]]
}
let BarcodeSprite: Sprite = null
let c39Nval = 0
let c39Tval = ""
let BarcodeImage: Image = null
let c39UnumList: number[] = []
let c39UtxtList: string[] = []
let c39count = 0
let c39Utxt = ""
let KeyIdx = 0
let CursorPos: number[] = []
let Ckey = ""
let c39table: string[][] = []
let c39idx = 0
let c39NumIdxList: number[] = []
let c39myText = ""
let c39Lpin: string[] = []
let c39Lwidth: number[] = []
let txt = ""
let WriteYourSelf = false
let SetupDone = false
let KeyHoldFrame: number[] = []
let KeyBoardSprite: Sprite = null
let MyText = ""
let c39ImageEncode: Image = null
let c39WidthI = 0
let c39i3 = 0
let c39ListText: string[] = []
let c39bgImage: Image = null
let c39KeyBoard: string[][] = []
let KeyBoardImage: Image = null
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320;
    export const ARCADE_SCREEN_HEIGHT = 240;
}
scene.setBackgroundColor(15)
KeyHoldFrame = [
0,
0,
0,
0,
0,
0,
0
]
let RemKey = 4
SetupC39table()
SetupKeyBoardOfC39()
c39GettingReadyToEncodeToCode39("MAKECODE ARCADE")
SetupDone = true
WriteYourSelf = false
game.onUpdate(function () {
    if (WriteYourSelf) {
        if (GetKeyHoldFrame(controller.left.isPressed(), 0, RemKey)) {
            CursorPos[0] = Math.max(CursorPos[0] - 1, 0)
        }
        if (GetKeyHoldFrame(controller.up.isPressed(), 1, RemKey)) {
            CursorPos[1] = Math.max(CursorPos[1] - 1, 0)
        }
        if (GetKeyHoldFrame(controller.right.isPressed(), 2, RemKey)) {
            CursorPos[0] = Math.min(CursorPos[0] + 1, c39KeyBoard[0].length - 1)
        }
        if (GetKeyHoldFrame(controller.down.isPressed(), 3, RemKey)) {
            CursorPos[1] = Math.min(CursorPos[1] + 1, c39KeyBoard.length - 1)
        }
    }
    if (KeyBoardSprite) {
        KeyBoardSprite.setImage(RenderKeyBoard(10, 10, CursorPos[0], CursorPos[1]))
        KeyBoardSprite.x = scene.screenWidth() / 2
        KeyBoardSprite.bottom = scene.screenHeight()
    }
})
game.onUpdate(function () {
    if (SetupDone) {
        if (!(BarcodeSprite)) {
            BarcodeSprite = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Barcode)
        }
        BarcodeSprite.setImage(BarcodeImage)
        BarcodeSprite.top = 0
        BarcodeSprite.x = scene.screenWidth() / 2
    }
})
