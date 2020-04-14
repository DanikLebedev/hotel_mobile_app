import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Alert, RefreshControl
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
import { Ionicons } from '@expo/vector-icons';
import { ErrorToast, SuccessToast } from '../../components/Toast/Toast';

export const ArticleInfoScreen = () => {
    const context = useContext(ClientContext);
    const [articleId, setArticleId] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>(
        context.fetchedAllComments
    );
    const [refreshing, setRefreshing] = useState(false);
    const [commentForm, setCommentForm] = useState<Comment>({
        articleId: undefined,
        text: '',
        userEmail: context.fetchedUserInfo.email
    });
    const [isEdit, setIsEdit] = useState({ edit: false, id: '' });

    const navigationState = useNavigationState(state => state.routes);

    const checkParams = () => {
        const paramObj = navigationState.filter(({ params }) => {
            return params !== undefined ? params['articleId'] : params;
        });
        setArticleId(paramObj[0].params['articleId']);
    };

    const deleteCommentHandler = async (id: string) => {
        try {
            const data = await CommentService.deleteComment(
                JSON.stringify({ _id: id }),
                {
                    Authorization: `Bearer ${context.token}`,
                    'Content-Type': 'application/json'
                }
            );
            console.log(data);
            updateComments();
            Toast.showSuccess(data.message, SuccessToast);
        } catch (e) {
            console.log(e.message);

            Toast.show('Something went wrong', ErrorToast);
        }
    };

    const addCommentHandler = async () => {
        try {
            setCommentForm({ ...commentForm, text: '' });
            const data = await CommentService.postComment(
                { ...commentForm },
                {
                    Authorization: `Bearer ${context.token}`,
                    'Content-Type': 'application/json'
                }
            );
            updateComments();
        } catch (e) {
            Toast.show('Something went wrong', ErrorToast);
        }
    };

    const updateCommentHandler = async () => {
        try {
            const data = await CommentService.updateComment(
                JSON.stringify(commentForm),
                {
                    Authorization: `Bearer ${context.token}`,
                    'Content-Type': 'application/json'
                }
            );
            setIsEdit({ edit: false, id: '' });
            updateComments();
        } catch (e) {
            Toast.show('Something went wrong', ErrorToast);
            console.log(e.message);
        }
    };

    const articleInfo = context.fetchedAllArticles.filter(article => {
        return article._id === articleId;
    });

    const updateComments = async () => {
        setRefreshing(true)
        const { comment }: Comments = await CommentService.getAllComments();
        setComments(comment);
        setRefreshing(false);

    };

    const showEditModal = (id: string) => {
        Alert.alert('Comment', 'Comments Actions', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Edit',
                style: 'default',
                onPress: () => setIsEdit({ edit: true, id })
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => deleteCommentHandler(id)
            }
        ]);
    };

    useEffect(() => {
        checkParams();
        updateComments();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={   <RefreshControl
                refreshing={refreshing}
                onRefresh={updateComments}
            />}>
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
                                            articleInfo[0].image
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
                            {!isEdit.edit ? (
                                <>
                                    <Input
                                        containerStyle={styles.commentInput}
                                        placeholder={'Your comment...'}
                                        onChangeText={text =>
                                            setCommentForm({
                                                ...commentForm,
                                                articleId,
                                                text
                                            })
                                        }
                                    />
                                    <Button
                                        title={'Send'}
                                        buttonStyle={{
                                            backgroundColor: '#000'
                                        }}
                                        onPress={addCommentHandler}
                                    />
                                </>
                            ) : null}
                        </View>
                        <View style={styles.commentWrapper}>
                            {comments.length ? (
                                comments.map(comment => {
                                    return (
                                        <TouchableOpacity
                                            onPress={
                                                context.fetchedUserInfo
                                                    .email === comment.userEmail
                                                    ? () =>
                                                        showEditModal(
                                                            comment._id
                                                        )
                                                    : () => {
                                                    }
                                            }
                                        >
                                            <View style={styles.commentItem}>
                                                {isEdit.edit &&
                                                isEdit.id === comment._id ? (
                                                    <View
                                                        style={
                                                            styles.commentInputWrapper
                                                        }
                                                    >
                                                        <Input
                                                            containerStyle={
                                                                styles.commentInput
                                                            }
                                                            defaultValue={
                                                                comment.text
                                                            }
                                                            placeholder={
                                                                'Your comment...'
                                                            }
                                                            onChangeText={text =>
                                                                setCommentForm({
                                                                    ...commentForm,
                                                                    articleId,
                                                                    text,
                                                                    _id: comment._id
                                                                })
                                                            }
                                                        />
                                                        <Button
                                                            containerStyle={
                                                                styles.editButtons
                                                            }
                                                            buttonStyle={{
                                                                backgroundColor:
                                                                    '#4bb543'
                                                            }}
                                                            onPress={
                                                                updateCommentHandler
                                                            }
                                                            icon={
                                                                <Ionicons
                                                                    name={
                                                                        'ios-checkmark'
                                                                    }
                                                                    size={26}
                                                                    color={
                                                                        '#fff'
                                                                    }
                                                                />
                                                            }
                                                        />
                                                        <Button
                                                            containerStyle={
                                                                styles.editButtons
                                                            }
                                                            icon={
                                                                <Ionicons
                                                                    name={
                                                                        'ios-close'
                                                                    }
                                                                    color={
                                                                        '#fff'
                                                                    }
                                                                    size={26}
                                                                />
                                                            }
                                                            buttonStyle={{
                                                                backgroundColor:
                                                                    '#ed4337'
                                                            }}
                                                            onPress={() =>
                                                                setIsEdit({
                                                                    edit: false,
                                                                    id: ''
                                                                })
                                                            }
                                                        />
                                                    </View>
                                                ) : (
                                                    <>
                                                        <View>
                                                            <Text
                                                                style={{
                                                                    fontWeight:
                                                                        'bold'
                                                                }}
                                                            >
                                                                {
                                                                    comment.userEmail.split(
                                                                        '@'
                                                                    )[0]
                                                                }
                                                            </Text>
                                                            <Text
                                                                style={
                                                                    styles.commentText
                                                                }
                                                            >
                                                                {comment.text}
                                                            </Text>
                                                        </View>
                                                        <Text
                                                            style={
                                                                styles.commentDate
                                                            }
                                                        >
                                                            {new Date(
                                                                comment.createdAt
                                                            ).toLocaleDateString()}
                                                        </Text>
                                                    </>
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })
                            ) : (
                                <Text>There are no comments yet</Text>
                            )}
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
        justifyContent: 'center'
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        flex: 3
    },
    image: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    roomTitle: {
        fontSize: 20,
        color: '#fff',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: '#000',
        padding: 10,
        fontWeight: 'bold'
    },
    descriptionWrapper: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-start'
    },
    descriptionTitle: {
        textAlign: 'center',
        fontSize: 18
    },
    text: {
        marginHorizontal: 20,
        marginTop: 10,
        fontSize: 18
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
    },
    commentItem: {
        marginHorizontal: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginVertical: 15,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    commentDate: {
        color: '#cdcdcd'
    },
    commentText: {
        fontSize: 15
    },
    editButtons: {
        marginRight: 10,
        width: 40
    }
});
