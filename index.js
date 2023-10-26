import React, { useState, useEffect, useRef } from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
    StyleSheet
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const textColor = "#000";
const lightgreyColor = "#b3b3b3";
const errorColor = "red";

function customSplice(array, start, deleteCount, ...items) {

    try {
        const result = [];

        // If the start index is negative, adjust it to count from the end of the array
        const actualStart = start < 0 ? Math.max(array.length + start, 0) : Math.min(start, array.length);

        // If deleteCount is not given or is greater than the remaining elements, delete to the end of the array
        const actualDeleteCount = typeof deleteCount === 'undefined' ? array.length - actualStart : Math.min(deleteCount, array.length - actualStart);

        // Add the elements above the current indexStart to the result
        for (let i = 0; i < actualStart; i++) {
            result.push(array[i]);
        }

        // Add the new elements to the result
        for (const item of items) {
            result.push(item);
        }

        // Skip items to be removed
        const endIndex = actualStart + actualDeleteCount;
        for (let i = endIndex; i < array.length; i++) {
            result.push(array[i]);
        }

        return result;
    } catch (error) {
        return array;
    }
}


const TagInput = ({
    data = [],
    required = false,
    label = '',
    labelStyle,
    errorVisibility = false,
    errorMessage = '',
    placeholder = '',
    placeholderTextColor = lightgreyColor,
    getTags,
    iconSize = 20,
    primaryColor = "#6666ff",
    boxStyle,
    textInputStyle,
    tagStyle,
    textTagStyle,
    deleteButtomStyle
}) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagText, setTagText] = useState('')
    const textInputRef = useRef(null);

    useEffect(() => {
        if (data) {
                setSelectedTags(data);
        }
    }, [data]);


    const deleteTag = (tag) => {
        try {
            let newVectorTags = [...selectedTags];
            const findIndex = newVectorTags.findIndex((value) => value == tag);

            if (findIndex != -1) {
                newVectorTags = customSplice(newVectorTags, findIndex, 1);
            }

            getTags(newVectorTags);

        } catch (error) {
        }
    }

    const saveAllTags = () => {
        if (tagText) {
            let newVectorTags = [...selectedTags];
            var tagString = tagText;
            if (tagString.includes(",")) {
                var values = tagString.split(",");
                values.forEach(newTag => {
                    if (newTag) {
                        const findIndex = newVectorTags.findIndex((value) => value.toLowerCase() == newTag.toLowerCase());
                        if (findIndex == -1)
                            newVectorTags.push(newTag);
                    }
                });
            } else {
                var newTag = tagText;
                const findIndex = newVectorTags.findIndex((value) => value.toLowerCase() == newTag.toLowerCase());
                if (findIndex == -1)
                    newVectorTags.push(newTag);

            }

            getTags(newVectorTags);
            setTagText('');
        }

    }

    const onChangeText = (value) => {
        var newChart = value[value.length - 1];
        if (newChart === ' ') {
            saveAllTags();
        } else {
            setTagText(value);
        }
    }


    return (
        <View style={{ width: '100%' }}>
            <View style={(boxStyle) ? [styles.defaultBoxStyle, { borderColor: primaryColor }, { ...boxStyle }] : [styles.defaultBoxStyle, { borderColor: primaryColor }]}>
                <View style={{ width: iconSize + 4, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                        name={"tag-multiple-outline"}
                        size={iconSize}
                        color={primaryColor}
                    />
                </View>

                <View style={{ flex: 1, height: '100%', justifyContent: 'center', paddingHorizontal: 5 }}>
                    <TextInput
                        ref={textInputRef}
                        value={tagText}
                        onChangeText={(value) => onChangeText(value)}
                        style={(textInputStyle) ? [styles.defaultTextInputStyle, { ...textInputStyle }] : styles.defaultTextInputStyle}
                        onSubmitEditing={saveAllTags}
                        placeholderTextColor={placeholderTextColor}
                        placeholder={placeholder}

                    />
                </View>

                <View style={{ width: iconSize + 4 }}>
                    {(tagText)
                        ?
                        <TouchableOpacity onPress={() => { setTagText('') }}>
                            <View style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
                                <Icon
                                    name={"close"}
                                    size={iconSize}
                                    color={primaryColor}
                                />
                            </View>
                        </TouchableOpacity>
                        :
                        null

                    }
                </View>

            </View>

            {/* Renders the label and error message*/}
            {(label)
                &&
                (required)
                ?
                <View style={{ alignItems: 'flex-start', width: '100%', flexDirection: "row" }}>
                    <Text style={
                        (labelStyle)
                            ?
                            [{ ...labelStyle }, {
                                color: (errorVisibility)
                                    ? errorColor
                                    : (labelStyle?.color)
                                        ? labelStyle.color
                                        : lightgreyColor
                            }]
                            :
                            [styles.defaultLabelStyle, {
                                color: (errorVisibility)
                                    ? errorColor
                                    : lightgreyColor
                            }]}>* {label} </Text>

                    {(errorVisibility)
                        ?
                        <Text style={(labelStyle)
                            ? [{ ...labelStyle }, { color: errorColor }]
                            : [styles.defaultLabelStyle, { color: errorColor }]}>{(errorMessage) ? "(" + errorMessage + ")" : ''}</Text>
                        :
                        null
                    }
                </View>
                :
                <View style={{ alignItems: 'flex-start', width: '100%', flexDirection: "row" }}>
                    <Text style={(labelStyle)
                        ?
                        [{ ...labelStyle }, {
                            color: (required)
                                ? (errorVisibility)
                                    ? errorColor
                                    : (labelStyle?.color)
                                        ? labelStyle.color
                                        : lightgreyColor
                                : (labelStyle?.color)
                                    ? labelStyle.color
                                    : lightgreyColor
                        }]
                        :
                        [styles.defaultLabelStyle, {
                            color: (required)
                                ? (errorVisibility)
                                    ? errorColor
                                    : (labelStyle?.color)
                                        ? labelStyle.color
                                        : lightgreyColor
                                : (labelStyle?.color)
                                    ? labelStyle.color
                                    : lightgreyColor
                        }]}>{label}</Text>
                </View>
            }

            <View style={{ marginVertical: 5, width: '100%' }}>
                <ScrollView
                    vertical
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    style={{ flexGrow: 1 }}
                    contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',//Needed for wrapping for the items
                        flexGrow: 1,
                        justifyContent: 'center'
                    }}
                >
                    {
                        (data).map((item) => {
                            return (
                                <View key={item} style={styles.tagContainerStyle}>
                                    <View style={(tagStyle) ? [styles.defaultTagStyle, { borderColor: primaryColor }, { ...tagStyle }] : [styles.defaultTagStyle, { borderColor: primaryColor }]}>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text style={(textTagStyle) ? [styles.defaultTextTagStyle, { ...textTagStyle }] : styles.defaultTextTagStyle}>{item}</Text>
                                        </View>

                                        <View style={{ justifyContent: 'center', height: '100%',alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => { deleteTag(item) }} style={(deleteButtomStyle)
                                                ?
                                                [styles.defaultDeleteButtomStyle, { ...deleteButtomStyle }]
                                                :
                                                styles.defaultDeleteButtomStyle}>
                                                <Icon
                                                    name={"close"}
                                                    size={15}
                                                    color={primaryColor}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    defaultBoxStyle: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        borderWidth: 0.5,
        flexDirection: 'row',
        padding: 2
    },
    defaultTextInputStyle: {
        fontSize: 20,
        color: textColor
    },
    tagContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
        marginTop: 3
    },
    defaultTagStyle: {
        flexDirection: 'row',
        height: 30,
        borderRadius: 30 / 2,
        borderWidth: 0.5,
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 5,
        backgroundColor: "#fff"
    },
    defaultTextTagStyle: {
        fontSize: 20,
        color: textColor,
        marginLeft: 5
    },
    defaultDeleteButtomStyle: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(240,240,240,1)"
    },
    defaultLabelStyle: {
        fontSize: 14
    }
});

export default TagInput;