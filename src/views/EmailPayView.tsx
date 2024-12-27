import { InputEmail } from '@/components/input';
import { ModalTransfer } from '@/components/modal/ModalTransfer';
import { getEmail } from '@/db/getEmails';
import { Colors } from '@/themes/colors';
import { spacingStyle } from '@/themes/spacingStyle';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

export const EmailPayView = () => {
    const [emailList, setEmailList] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredEmailList, setFilteredEmailList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalEvent, setIsModalEvent] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<any>(null);
    // console.log(
    //     'Result selectedBrand = ',
    //     JSON.stringify(selectedBrand, null, 2),
    // );

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await getEmail(searchQuery);
            const { brands } = response;
            setFilteredEmailList(
                brands?.filter(
                    (item: any) =>
                        item.email
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) || [],
                ),
            );
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            setFilteredEmailList([]);
        } finally {
            setIsLoading(false);
        }
        const results = searchQuery
            ? emailList.filter((item: any) =>
                  item.email.toLowerCase().includes(searchQuery.toLowerCase()),
              )
            : emailList;
        setSearchQuery(results);
    };

    const shopImage = (groupName: string) => {
        return `http://netivooregon.s3.amazonaws.com/modatexrosa2/img/modatexrosa2/${groupName.toLowerCase()}.gif`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    onChangeText={text => setSearchQuery(text)}
                    style={styles.searchInput}
                    placeholder="Ingresa el correo"
                />
                <AntDesign
                    name="search1"
                    size={20}
                    color="black"
                    style={styles.searchIcon}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}>
                    <Text style={styles.buttonText}>BUSCAR</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.resultsSection}>
                <Text style={styles.resultsText}>
                    Resultado de la búsqueda:
                </Text>
                <FlatList
                    data={filteredEmailList}
                    // keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <InputEmail
                            title={item.name}
                            email={item.email}
                            isOpenModal={() => {
                                setSelectedBrand(item);
                                setIsModalEvent(true);
                            }}
                            id={item.id.toString()}
                        />
                    )}
                    ListEmptyComponent={
                        isLoading ? (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 100,
                                }}>
                                <ActivityIndicator
                                    size="large"
                                    color={'black'}
                                />
                            </View>
                        ) : (
                            <Text
                                style={{ textAlign: 'center', marginTop: 25 }}>
                                No se encontraron resultados
                            </Text>
                        )
                    }
                />
            </View>
            {selectedBrand && (
                <ModalTransfer
                    titleBrand={selectedBrand.group_name}
                    photoBrand={{
                        uri: shopImage(selectedBrand.group_name),
                    }}
                    isClose={() => setIsModalEvent(false)}
                    isVisible={isModalEvent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e6e5e5',
        flex: 1,
        padding: spacingStyle.medium,
    },
    searchBarContainer: {
        marginVertical: spacingStyle.large,
        position: 'relative',
    },
    searchInput: {
        backgroundColor: 'white',
        fontSize: 18,
        height: 50,
        paddingLeft: 45,
    },
    searchIcon: {
        left: 15,
        position: 'absolute',
        top: 15,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    searchButton: {
        alignItems: 'center',
        backgroundColor: Colors.colorModapagoBase,
        borderRadius: 6,
        height: 50,
        justifyContent: 'center',
        marginBottom: spacingStyle.large,
        width: 450,
        // width: '60%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    resultsSection: {
        backgroundColor: 'white',
        flex: 1,
        padding: spacingStyle.medium,
    },
    resultsText: {
        fontSize: 18,
    },
    noResultsText: {
        color: 'black',
        fontSize: 18,
    },
});
