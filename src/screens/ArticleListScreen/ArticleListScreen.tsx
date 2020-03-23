import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import { Card } from 'react-native-elements';
import { ClientContext } from '../../context/client.context';
import { Article } from '../../interfaces/clientInterfaces';
import { ArticleService } from '../../APIServices/articleService';
import { config } from '../../../config';
import { NavigationActions } from 'react-navigation';

export const ArticleListScreen = ({ navigation }) => {
    const context = useContext(ClientContext);
    const [articles, setArticles] = useState<Article[]>(
        context.fetchedAllArticles,
    );

    useEffect(() => {
        ArticleService.getAllArticles().then(({ article }) =>
            setArticles(article),
        );
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={articles}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ArticleInfo', {
                                    articleId: item._id,
                                })
                            }
                        >
                            <Card
                                title={
                                    item.title +
                                    ':  ' +
                                    new Date(
                                        item.createdAt,
                                    ).toLocaleDateString()
                                }
                                image={{
                                    uri:
                                        config.API_URL +
                                        '/static/' +
                                        item.image,
                                }}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    readButton: {
        fontSize: 16,
    },
});
