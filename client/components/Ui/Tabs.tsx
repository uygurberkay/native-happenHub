import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
// @ts-ignore
import { Styles } from "../../constants/Color";
import { useTranslation } from "react-i18next";

// const TabButton = ({name, activeTab, onHandleSearchType}) => {
//     const { t } = useTranslation()
//     return (
//             <Pressable 
//                 onPress={onHandleSearchType}
//                 style={({pressed}) => pressed && styles.btn(name, activeTab)}>
//                 <View style={styles.buttonContainer}>
//                     <Text style={styles.btnText(name, activeTab)}>{t(`${name}`)}</Text>
//                 </View>
//             </Pressable>
//     );
// }

// const Tabs = ({ tabs, activeTab, setActiveTab }) => {
//     return (
//         <View style={{backgroundColor: Styles.colors.lightCoral, marginHorizontal: 12}}>
//             <View style={styles.container}>
//             <FlatList
//                 data={tabs}
//                 renderItem={({item}) => (
//                 <TabButton 
//                     name={item}
//                     activeTab={activeTab}
//                     onHandleSearchType={() => setActiveTab(item)}
//                 />
//                 )}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 keyExtractor={item => item}
//                 contentContainerStyle={{ columnGap: 6 }}
//                 scrollEnabled={false}
//             />
//          </View>

//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         marginVertical: 10,
//         alignItems: "center",
//         backgroundColor: Styles.colors.white,
//         borderRadius: 10,
//         borderColor: Styles.colors.darkCharcoal,
//         borderWidth: .2,
//     },
//     buttonContainer: {
//         padding: 6,
//         marginHorizontal: 16,
//         marginVertical: 4,
//     },
//     btn : ({ name, activeTab }) => ({
//         backgroundColor: name === activeTab ? Styles.colors.bluePrimary :  Styles.colors.lightCoral,
//         color: name ===  activeTab ? Styles.colors.darkCharcoal : Styles.colors.lightCoral,
//         borderRadius: 8,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 5.84,
//         elevation: 5, // Android
//     }),
//     btnText: ({ name, activeTab }) => ({
//         fontSize: 16,
//         color: name === activeTab ?  Styles.colors.darkCharcoal : "#AAA9B8",
//     }),
// })

// export default Tabs



interface TabButtonProps {
    name: any;
    activeTab: any;
    onHandleSearchType: () => void;
}

interface TabsProps {
    tabs: any;
    activeTab :any;
    setActiveTab: any;
}

const TabButton = ({name, activeTab, onHandleSearchType}: TabButtonProps) => {
    const { t } = useTranslation()
    return (
            <Pressable 
                onPress={onHandleSearchType}
                // @ts-ignore
                style={({pressed}) => pressed && styles.btn(name, activeTab)}>
                <View style={styles.buttonContainer}>
                    {/* @ts-ignore */}
                    <Text style={styles.btnText(name, activeTab)}>{t(`${name}`)}</Text>
                </View>
            </Pressable>
    );
}

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
    return (
        <View style={{backgroundColor: Styles.colors.lightCoral, marginHorizontal: 12}}>
            <View style={styles.container}>
                <FlatList
                    data={tabs}
                    renderItem={({item}) => (
                    <TabButton 
                        name={item}
                        activeTab={activeTab}
                        onHandleSearchType={() => setActiveTab(item)}
                    />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item}
                    contentContainerStyle={{ columnGap: 6 }}
                    scrollEnabled={false}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: "center",
        backgroundColor: Styles.colors.white,
        borderRadius: 10,
        borderColor: Styles.colors.darkCharcoal,
        borderWidth: .2,
    },
    buttonContainer: {
        padding: 6,
        marginHorizontal: 16,
        marginVertical: 4,
    },
    // @ts-ignore
    btn : ({ name, activeTab }) => ({
        backgroundColor: name === activeTab ? Styles.colors.bluePrimary :  Styles.colors.lightCoral,
        color: name ===  activeTab ? Styles.colors.darkCharcoal : Styles.colors.lightCoral,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5, // Android
    }),
    // @ts-ignore
    btnText: ({ name, activeTab }) => ({
        fontSize: 16,
        color: name === activeTab ?  Styles.colors.darkCharcoal : "#AAA9B8",
    }),
})
export default Tabs
