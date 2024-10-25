import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { nowShowing } from '../Utils/Data';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NowShowing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const nav = useNavigation();

  const filteredMovies = nowShowing.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Thanh tìm kiếm */}
      <TextInput
        placeholder="Search for a movie"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        style={{
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          paddingHorizontal: 10,
          height: 40,
        }}
      />

      <FlatList
        numColumns={2}
        data={filteredMovies}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              nav.navigate('Details', { item });
            }}
            style={{
              flex: 1,
              margin: '1%',
              borderRadius: 10,
            }}
          >
            <Image style={{ height: 400, borderRadius: 10 }} source={{ uri: item.img }} />
            <View style={{ position: 'absolute', bottom: 25, left: 15, gap: 5 }}>
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
                {item.title}
              </Text>
              <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <MaterialIcons name="favorite" size={24} color="red" />
                <Text style={{ fontSize: 13, color: 'white', fontWeight: '400' }}>{item.fav}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NowShowing;
