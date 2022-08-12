import { useState } from 'react';
import { StyleSheet, View, Share, Text } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import { DataTable, Snackbar} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
  },
};

// 髪型
const hairStyleList = ['ショート', 'ミディアム', 'ロング', 'ツインテールラビット', 'ツインテールレギュラー', 'ツインテールカントリー', 'ポニーテール', 'サイドテール', 'お団子', 'ぱっつん', '編み込み'];

// 髪色
const hairColorList =  ['赤', '朱', '黄', '緑', '青', '紺', '紫', '茶', '亜麻色', '桃', '白', '黒', '白銀', '金'];

// 瞳色
const eyesColorList = ['赤', '朱', '黄', '翠', '青', '碧', '紺', '藍', '紫', '茶', '亜麻色', '桃', '白', '黒', '白銀', '金'];

//胸 (AAとEを低確率（1or2%くらいにする）)
const bustSizeList = ['AA', 'A', 'B', 'C', 'D', 'E'];

//身長:(120cm, 160cm以上,を低確率（1or2%くらいにする)
const bodyHeightList = ['約120cm', '147cm', '148cm', '149cm', '150cm', '151cm', '152cm', '153cm', '154cm', '155cm', '156cm', '160cm以上'];

// 学年：(幼女, 低学年, 高2, 高3を低確率（1or2%くらいにする）)
const gradeList = ['幼女', '低学年', '高学年', '中1', '中2', '中3', '高1', '高学年', '中1', '中2', '中3', '高1', '高学年', '中1', '中2', '中3', '高1', '高2', '高3'];

// 服:
const costumeList = ['JSコス', 'バスケユニフォーム', 'テニスユニフォーム', '猫コス', '犬コス', 'ナース', 'バニー', 'ブルマ', '体操服', 'スク水', 'フリル水着', 'ビキニ', 'ワンピース水着', '水兵風水着', 'ビキニスカート', '結びTシャツ', 'ホットパンツ', 'ウエディング', 'チア', 'ミニスカフリルサンタ', 'セーラー服', 'ブレザー', 'ゴスロリ', '浴衣', '大正モダン', 'ハロウィン', 'ジャージ', 'Yシャツ', '島風コス', '和装', 'シスター'];

// アクセサリー: (項目を0から2くらいオンオフで付ける（出来たら）)
const accessoryList = ['眼鏡', 'ホクロ', '鉢巻', 'リボン', 'ピンどめ', 'シュシュ', 'カチューシャ', 'ヘッドホン', '帽子', 'エルフ耳', '猫耳', '犬耳', 'フード', '飴', '食べ物', 'アホ毛', 'イヤリング', 'ネックレス'];

// 属性キーワード:
const keywordList = ['元気', 'かわいい', 'ツンデレ', 'ヤンデレ', '恥ずかしがり屋', '見栄っ張り', 'メスガキ', 'はわわ', 'やんちゃ', 'おっとり', '委員長', 'クール', 'マッマ', 'お姉さん', '妹', 'ボーイッシュ', '大和撫子', 'お人形', 'ぶりっ子', '清楚', 'ギャル', '幼なじみ', '中二病', '天使', 'カタコト', '古風', 'アイドル', 'えっち', '素直', '優しい', '笑顔', '面白い', '派手', '不思議', '負けず嫌い', 'まじめ', '子供っぽい', 'ロリ', '無邪気', 'ボクっ娘', '突撃', 'ドジっ子'];

export default function App() {
  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const [character, setCharacter] = useState({
    hairStyle: '???',
    hairColor: '???',
    eyesColor: '???',
    bustSize: '???',
    bodyHeight: '???',
    costume: '???',
    grade: '???',
    accessory: '???',
    keyword: '???',
  });
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  const generateCharacter = () => {
    const hairStyle = hairStyleList[getRandomInt(hairStyleList.length)];
    const hairColor = hairColorList[getRandomInt(hairColorList.length)];
    const eyesColor = eyesColorList[getRandomInt(eyesColorList.length)];
    const bustSize = bustSizeList[getRandomInt(bustSizeList.length)];
    const bodyHeight = bodyHeightList[getRandomInt(bodyHeightList.length)];
    const costume = costumeList[getRandomInt(costumeList.length)];
    const grade = gradeList[getRandomInt(gradeList.length)];
    const accessory = accessoryList[getRandomInt(accessoryList.length)];
    const keyword = keywordList[getRandomInt(keywordList.length)];
    setCharacter({...character, hairStyle, hairColor, eyesColor, bustSize, bodyHeight, costume, grade, accessory, keyword});
  };

  const onDismissSnackBar = () => setSnackbarVisible(false);

  const onToggleSnackBar = (text) => {
    setSnackbarText(text);
    setSnackbarVisible(!snackbarVisible)
  };

  const onShare = async () => {
    try {
      const message = `新しいキャラクターを生成しました。\n髪型：${character.hairStyle}\n髪色：${character.hairColor}\n瞳色：${character.eyesColor}\n胸：${character.bustSize}\n身長：${character.bodyHeight}\n学年：${character.grade}\n服：${character.costume}\nアクセサリー：${character.accessory}\n属性キーワード：${character.keyword}\nみんなも作ろう→ https://random-character-generator.vercel.app`;
      const result = await Share.share({
        message: message,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.headerText}>キャラクターをつくろう</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>属性</DataTable.Title>
            <DataTable.Title>値</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>髪型</DataTable.Cell>
            <DataTable.Cell onPress={() => onToggleSnackBar(character.hairStyle)}>{character.hairStyle}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>髪色</DataTable.Cell>
            <DataTable.Cell onPress={() => onToggleSnackBar(character.hairColor)}>{character.hairColor}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>瞳色</DataTable.Cell>
            <DataTable.Cell onPress={() => onToggleSnackBar(character.eyesColor)}>{character.eyesColor}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>胸</DataTable.Cell>
            <DataTable.Cell onPress={() => onToggleSnackBar(character.bustSize)}>{character.bustSize}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>身長</DataTable.Cell>
            <DataTable.Cell onPress={() => onToggleSnackBar(character.bodyHeight)}>{character.bodyHeight}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>学年</DataTable.Cell>
            <DataTable.Cell onPress={() => onToggleSnackBar(character.grade)}>{character.grade}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>服</DataTable.Cell>
            <DataTable.Cell onPress={() => onToggleSnackBar(character.costume)}>{character.costume}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>アクセサリー</DataTable.Cell>
            <DataTable.Cell onPress={() => onToggleSnackBar(character.accessory)}>{character.accessory}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>属性キーワード</DataTable.Cell>
            <DataTable.Cell onPress={() => onToggleSnackBar(character.keyword)}>{character.keyword}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <View style={styles.buttonsContainer}>
          <Button style={styles.button} icon="cached" mode="contained" onPress={() => generateCharacter()}>
            キャラクター生成
          </Button>
          <Button style={styles.button} icon="share" mode="contained" onPress={onShare}>
            共有
          </Button>
        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
          duration={2000}
        >
          {snackbarText}
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  button: {
    margin: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 8, 
  },
  headerText: {
    fontSize: 20,
  }
});
