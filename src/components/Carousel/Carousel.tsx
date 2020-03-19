import React, {
    Component,
    useContext,
    useState,
    useRef,
    useEffect,
} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import { ClientContext } from '../../context/client.context';
import { Article } from '../../interfaces/clientInterfaces';
import { config } from '../../../config';
import { ArticleService } from '../../APIServices/articleService';

const { width } = Dimensions.get('window');

export const ImageCarousel = () => {
    const fetchedArticles = useContext(ClientContext).fetchedAllArticles;
    const [articles, setArticles] = useState<Article[]>(fetchedArticles);

    const renderItem = ({ item, index }) => {
        const { createdAt, title, text, image }: Article = item;
        return (
            <TouchableOpacity style={styles.item}>
                <ImageBackground
                    source={{ uri: config.API_URL + '/static/' + image }}
                    style={styles.imageBackground}
                >
                    <View style={styles.rightTextContainer}>
                        <Text style={styles.rightText}>
                            {new Date(createdAt).toLocaleDateString()}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.lowerContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        ArticleService.getAllArticles().then(({ article }) =>
            setArticles(article),
        );
    }, [fetchedArticles]);

    return (
        <Carousel
            style={styles.carousel}
            data={articles}
            renderItem={renderItem}
            itemWidth={0.7 * width}
            inActiveOpacity={0.3}
            containerWidth={width}
        />
    );
};

const styles = StyleSheet.create({
    carousel: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        paddingTop: 30,
        paddingBottom: 30,
    },
    item: {
        borderWidth: 2,
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        borderColor: 'white',
        elevation: 3,
    },
    imageBackground: {
        flex: 1,
        backgroundColor: '#EBEBEB',
        borderWidth: 5,
        borderColor: 'white',
    },
    rightTextContainer: {
        marginLeft: 'auto',
        marginRight: -2,
        backgroundColor: 'rgba(49, 49, 51,0.5)',
        padding: 3,
        marginTop: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    rightText: { color: 'white' },
    lowerContainer: {
        margin: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    contentText: {
        marginTop: 10,
        fontSize: 12,
    },
});
