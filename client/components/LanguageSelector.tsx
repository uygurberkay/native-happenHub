import { 
    View, 
    Text, 
    Modal, 
    FlatList,
    Pressable,
    StyleSheet
} from 'react-native'
import { useState } from 'react';
import i18next, { languageResources } from '../services/i18next';
import languagesList from '../services/languagesList.json';
import { useTranslation } from 'react-i18next';

/* TypeScript Definitions */
type Language = {
    name: string;
    nativeName: string;
};
type Languages = Record<string, Language>;

interface LanguageTypes<T> {
    languagesList?: T;
}

const LanguageSelector: React.FC<LanguageTypes<Languages>> = () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    const changeLng = (lng: string) => {
        i18next.changeLanguage(lng);
        setVisible(false);
    };

    return (
        <>
            <Modal visible={visible} onRequestClose={() => setVisible(false)}>
                <View style={styles.languageList}>
                    <FlatList data={Object.keys(languageResources)} renderItem={({item}) => (
                        <Pressable 
                            style={styles.languageButton}
                            onPress={() => changeLng(item)}
                        >
                            <Text style={styles.lngName}>
                                {(languagesList as Languages)[item].nativeName}
                            </Text>
                        </Pressable>
                    )}/>
                </View>
            </Modal>
            <Pressable onPress={() => setVisible(true)}>
                <Text>{t('Language Selection')}</Text>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    languageList: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#6258e8',
    },
    languageButton: {
        padding: 10,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
    },
    lngName: {
        fontSize: 16,
        color: 'white',
    },
});

export default LanguageSelector