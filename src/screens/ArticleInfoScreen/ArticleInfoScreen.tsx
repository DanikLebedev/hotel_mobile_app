import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { config } from '../../../config';
import { useNavigationState, StackActions } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { ClientContext } from '../../context/client.context';
import { useState } from 'react';

export const ArticleInfoScreen = () => {
    const context = useContext(ClientContext);
    const [articleId, setArticleId] = useState<string>('');
    const navigationState = useNavigationState(state => state.routes);

    const checkParams = () => {
        const paramObj = navigationState.filter(({ params }) => {
            return params !== undefined ? params['articleId'] : params;
        });
        setArticleId(paramObj[0].params['articleId']);
    };

    const articleInfo = context.fetchedAllArticles.filter(article => {
        return article._id === articleId;
    });

    useEffect(() => {
        checkParams();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.wrapper}
                    scrollEnabled={false}
                >
                    <View style={styles.imageWrapper}>
                        <ImageBackground
                            style={styles.image}
                            source={
                                articleInfo[0]
                                    ? {
                                          uri:
                                              config.API_URL +
                                              '/static/' +
                                              articleInfo[0].image,
                                      }
                                    : null
                            }
                        >
                            <Text style={styles.roomTitle}>
                                {articleInfo[0] ? articleInfo[0].title : null}
                            </Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.descriptionWrapper}>
                        <Text style={styles.text}>
                            {articleInfo[0] ? articleInfo[0].text : null}
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        flex: 3,
    },
    image: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    roomTitle: {
        fontSize: 20,
        color: '#fff',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: '#000',
        padding: 10,
        fontWeight: 'bold',
    },
    descriptionWrapper: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-start',
    },
    descriptionTitle: {
        textAlign: 'center',
        fontSize: 18,
    },
    text: {
        marginHorizontal: 20,
        marginTop: 10,
        fontSize: 18,
    },
});
