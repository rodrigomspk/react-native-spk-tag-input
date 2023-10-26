

# react-native-spk-tag-input

Label insertion component, manage the list from the visual environment and obtain an arrangement of all the words. Use it as a component for selecting keywords, emails, names, etc.

## Installation

To install use the following commands:
```bash
npm install react-native-spk-tag-input
````

```bash
yarn add react-native-spk-tag-input
````



## Simple Tag Component

<div style="text-align:center"><img src="https://github.com/rodrigomspk/react-native-spk-tag-input/blob/main/assets/TagInputCrop.gif" alt="Avatar Ticket" height="600" style="border: 2px solid #000;"></div>


### Simple Usage

```javascript
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TagInput from 'react-native-spk-tag-input';

export default function App() {
  const [tags, setTags] = useState([]);

  return (
      <View style={styles.container}>
          <TagInput
              data={tags}
              getTags={(tagsnuevo) => { setTags(tagsnuevo) }}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%'
  }
});
```

## Custom TagInput Component




### Usage

```javascript
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import TagInput from 'react-native-spk-tag-input';

export default function App() {
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [tags, setTags] = useState([]);

  return (
    <View style={styles.container}>
      <TagInput
        data={tags}
        getTags={(tagsnuevo) => {setTags(tagsnuevo);}}
        placeholder={"tagsPlaceholder"}
        label={"Tags"}
        errorVisibility={errorVisibility}
        errorMessage={"You have not selected tags"}
        required={true}
        placeholderTextColor={"#b3ffb3"}
        iconSize={20}
        primaryColor="#00ff00"
        boxStyle={{ backgroundColor: '#fff', height: 50 }}
        textInputStyle={{ backgroundColor: '#fff', height: '100%', color: "#33cc33" }}
        labelStyle={{ color: '#00cc00' }}
        tagStyle={{ borderWidth: 6, height: 50 }}
        textTagStyle={{ color: "#00cc00" }}
        deleteButtomStyle={{ backgroundColor: 'transparent', height: 30, justifyContent: 'center' }}
      />
      <View style={{ marginTop: 30 }} />
      <Button title='Validate Tags' onPress={() => { setErrorVisibility(!errorVisibility) }} />
    </View >
  );
}
```
## How do I insert tags to the list?
After pointing to the label, it can be entered using the space bar or the enter key to insert labels one by one, or several labels preceded by a comma. For example: one, two, three and then an insertion key.

## Props

<table>
    <thead>
        <tr>
            <th style="text-align:center;">prop</th>
            <th style="text-align:center;">Type</th>
            <th style="text-align:center;">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data</td>
            <td>Array</td>
            <td>The data to be displayed in the component.</td>
        </tr>
        <tr>
            <td>getTags</td>
            <td>Function</td>
            <td>Value return function, it is executed immediately after the insertion or deletion of a label, the value returned is an array of labels Ex:
            </br>
            [one, two, three]
            </td>
        </tr>
        <tr>
            <td>required</td>
            <td>Boolean</td>
            <td>Required selection element indicator (*).</td>
        </tr>
        <tr>
            <td>label</td>
            <td>string</td>
            <td style="text-align: justify;">Selection box title.</td>
        </tr>
        <tr>
            <td>labelStyle</td>
            <td>Object</td>
            <td style="text-align: justify;">Label style.
            </br>
            { fontSize: 13, color: '#000' }
            </td>
        </tr>
         <tr>
            <td>errorMessage</td>
            <td>string</td>
            <td style="text-align: justify;">Error message displayed in case of failed validation.</td>
        </tr>
        <tr>
            <td>errorVisibility</td>
            <td>Boolean</td>
            <td style="text-align: justify;">Indicates whether the error message is displayed.</td>
        </tr>
        <tr>
            <td>placeholder</td>
            <td>string</td>
            <td>Placeholder text displayed when no item is selected.</td>
        </tr>
        <tr>
            <td>placeholderTextColor</td>
            <td>string</td>
            <td style="text-align: justify;">Placeholder text color.</td>
        </tr>        
        <tr>
            <td>iconSize</td>
            <td>Number</td>
            <td style="text-align: justify;">Size of the icon (label icon/close icon) inside the box.</td>
        </tr>    
        <tr>
            <td>primaryColor</td>
            <td>string</td>
            <td style="text-align: justify;">Main color to highlight selected elements.</br>
            'rgba(20, 164, 172, 0.2)'</br>"#fff"</td>
        </tr>
        <tr>
            <td>boxStyle</td>
            <td>Object</td>
            <td style="text-align: justify;">label box style.
            </br>
            { backgroundColor: '#fff', height: 50 }
            </td>
        </tr>
        <tr>
            <td>textInputStyle</td>
            <td>Object</td>
            <td style="text-align: justify;">Text style inside the box.
            </br>
            { backgroundColor: '#fff', height: '100%', color: "#33cc33" }
            </td>
        </tr>
        <tr>
            <td>labelStyle</td>
            <td>Object</td>
            <td style="text-align: justify;">tag style (component name).
            </br>
            { color: '#00cc00' }
            </td>
        </tr>
        <tr>
            <td>tagStyle</td>
            <td>Object</td>
            <td style="text-align: justify;">individual label box style.
            </br>
            { borderWidth: 6, height: 50 }
            </td>
        </tr>
        <tr>
            <td>textTagStyle</td>
            <td>Object</td>
            <td style="text-align: justify;">individual label box text style.
            </br>
            { color: "#00cc00" }
            </td>
        </tr>
        <tr>
            <td>deleteButtomStyle</td>
            <td>Object</td>
            <td style="text-align: justify;">individual label box style.
            </br>
            { backgroundColor: 'transparent', height: 30, justifyContent: 'center' }
            </td>
        </tr>
    </tbody>
</table>


