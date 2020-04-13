import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { config } from '../../../config';
import { useNavigationState, StackActions } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { ClientContext } from '../../context/client.context';
import { useState } from 'react';
import { Comment, Comments } from '../../interfaces/clientInterfaces';
import { CommentService } from '../../APIServices/commentService';
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-tiny-toast';
import { ErrorToast } from '../../components/Toast/Toast';


export const ArticleInfoScreen = () => {
    const context = useContext(ClientContext);
    const [articleId, setArticleId] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>(context.fetchedAllComments)
    const [commentForm, setCommentForm] = useState<Comment>({
        articleId: undefined,
        text: "",
        userEmail: context.fetchedUserInfo.email
    })
    const navigationState = useNavigationState(state => state.routes);


    const checkParams = () => {
        const paramObj = navigationState.filter(({ params }) => {
            return params !== undefined ? params['articleId'] : params;
        });
        setArticleId(paramObj[0].params['articleId']);
    };

    const addCommentHandler = async () => {
        try {
            setCommentForm({ ...commentForm, text: ''})
            const data = await CommentService.postComment(
                { ...commentForm },
                { Authorization: `Bearer ${context.token}`, 'Content-Type': 'application/json' },
            );
            updateComments();
        } catch (e) {
            Toast.show('Something went wrong', ErrorToast)
        }
    };

    const articleInfo = context.fetchedAllArticles.filter(article => {
        return article._id === articleId;
    });

    const updateComments = async () => {
        const { comment }: Comments = await CommentService.getAllComments();
        setComments(comment);
    }

    useEffect(() => {
        checkParams();
        updateComments()
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
                    <View>
                        <Text style={styles.commentsTitle}>Comments</Text>
                        <View style={styles.commentInputWrapper}>
                            <Input containerStyle={styles.commentInput} value={commentForm.text} placeholder={'Your comment...'} onChangeText={text => setCommentForm({...commentForm, articleId, text})}/>
                            <Button title={'Send'} buttonStyle={{backgroundColor: '#000'}} onPress={addCommentHandler}/>
                        </View>
                        <View style={styles.commentWrapper}>
                            {comments.length ? comments.map(comment => {
                                return (
                                    <View>
                                        <Text>{comment.userEmail}</Text>
                                        <Text>{comment.text}</Text>
                                        <Text>{comment.createdAt}</Text>
                                    </View>
                                )
                            }): <Text>There are no comments yet</Text>}
                        </View>
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
    commentsTitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    commentWrapper: {
        flex: 1,
        marginHorizontal: 10
    },
    commentInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    commentInput: {
        width: '70%'
    }
});
