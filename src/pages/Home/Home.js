import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, StyleSheet, SectionList } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import posts from '../../_DATA/posts.json';
import Divider from '../../components/Divider';
import HorizontalSection from '../../components/HorizontalSection';
import SafeAreaView from '../../components/SafeAreaView';
import VerticalSection from '../../components/VerticalSection';
import Container from '../../layout/Container';
import BannerCarousel from '../../views/Home/BannerCarousel';
import { useAuth } from '../../hooks/useAuth';
import HorizontalMenu from '../../views/Home/HorizontalMenu';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';


const MENU = [
  {
    id: '1',
    title: 'Program',
    link: 'Program',
    icon: 'chip',
  },
  {
    id: '2',
    title: 'Mentor',
    link: 'Mentor',
    icon: 'account-tie',
  },
  {
    id: '3',
    title: 'Startup',
    link: 'Startup',
    icon: 'rocket',
  },
  {
    id: '4',
    title: 'Mitra',
    link: 'Mitra',
    icon: 'handshake',
  },
  {
    id: '5',
    title: 'Matchmaking',
    link: 'Matchmaking',
    icon: 'puzzle',
  },
]

const BANNER = [
  {
    id: '1',
    title: '',
    link: '',
    cover: 'https://drive.pastibisa.app/1708861913_65db29d9ef8b1.jpeg',
  },
  {
    id: '2',
    title: '',
    link: '',
    cover: 'https://drive.pastibisa.app/1708861879_65db29b709c61.jpeg',
  },
  {
    id: '3',
    title: '',
    link: '',
    cover: 'https://drive.pastibisa.app/1708861893_65db29c55d874.jpeg',
  },
  {
    id: '4',
    title: '',
    link: '',
    cover: 'https://drive.pastibisa.app/1708861879_65db29b709c61.jpeg',
  },
];

const POSTS = posts.map((post) => {
  return {
    id: String(post.id),
    title: post.title.rendered,
    cover: post.yoast_head_json.og_image[0].url,
    content: post.content.rendered,
    link: post.link,
    type: 'WEBSITE',
  };
});


const TopBox = () => {
  const { colors } = useTheme();
  return (
    <>
      <View
        style={[
          styles.topPart,
          {
            backgroundColor: colors.primary,
          },
        ]}
      />
      <View
        style={[
          styles.bottomPart,
          {
            backgroundColor: colors.surface,
          },
        ]}
      />
    </>
  );
};

const Search = () => {
  const { colors } = useTheme();
  return (
    <Container>
      <TextInput
        placeholder="Search activity..."
        left={
          <TextInput.Icon
            name="magnify"
            color={colors.disabled}
            rippleColor={colors.background}
            style={styles.searchIcon}
          />
        }
        mode="outlined"
        style={{ backgroundColor: colors.surface }}
      />
    </Container>
  );
};

const Home = ({ navigation }) => {
  const {role} = useAuth();
  const { colors } = useTheme();
  const [sharingSantaii, setSharingSantaii] = useState([]);

  const menuHome = role === 'Startupreneur' ? [
    {
      id: '1',
      title: 'Program',
      link: 'Program',
      icon: 'chip',
    },
    {
      id: '2',
      title: 'Mentor',
      link: 'Mentor',
      icon: 'account-tie',
    },
    {
      id: '3',
      title: 'Startup',
      link: 'Startup',
      icon: 'rocket',
    },
    {
      id: '4',
      title: 'Mitra',
      link: 'Mitra',
      icon: 'handshake',
    }
  ] : [
    {
      id: '1',
      title: 'Program',
      link: 'Program',
      icon: 'chip',
    },
    {
      id: '2',
      title: 'Mentor',
      link: 'Mentor',
      icon: 'account-tie',
    },
    {
      id: '3',
      title: 'Startup',
      link: 'Startup',
      icon: 'rocket',
    },
    {
      id: '4',
      title: 'Mitra',
      link: 'Mitra',
      icon: 'handshake',
    },
    {
      id: '5',
      title: 'Matchmaking',
      link: 'Matchmaking',
      icon: 'puzzle',
    },
  ];

  const createVid = (id, title, description) => {
    return {
      id,
      title,
      cover: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      link: `https://www.youtube.com/embed/${id}?rel=0&autoplay=0&showinfo=0&controls=1&fullscreen=1`,
      description,
      type: 'VIDEO',
    };
  };

  useEffect(() => {
    const dbRef = collection(db, "SharingSantaii");
  
    const q = query(dbRef, orderBy("title", "asc"));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setSharingSantaii(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }, []);

  const SHARINGSANTAII = sharingSantaii?.map((doc) => {
    return createVid(doc.id, doc.title, doc.description);
  });

  const SECTIONS = [
    {
      title: 'TopBox',
      data: [],
    },
    // {
    //   title: 'Search',
    //   data: [],
    // },
    {
      title: 'Banner',
      data: BANNER,
    },
    {
      title: 'Menu',
      data: menuHome,
    },
    {
      title: 'Divider',
      data: [],
    },
    {
      title: 'Recommended for You',
      data: SHARINGSANTAII.slice(0, 5),
      viewAll: 'AllSharing',
    },
    {
      title: 'Blog and News',
      data: POSTS,
      viewAll: 'AllBlogNews',
    },
  ];

  const handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y < 36) {
      setStatusBarBackgroundColor(colors.primary);
      setStatusBarStyle('light');
    }

    if (e.nativeEvent.contentOffset.y >= 36) {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.primary);
      setStatusBarStyle('light');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView>
      <SectionList
        sections={SECTIONS}
        renderSectionHeader={({ section }) => {
          if (section.title === 'TopBox') return <TopBox />;

          if (section.title === 'Search') return <Search />;

          if (section.title === 'Banner')
            return <BannerCarousel data={section.data} mt={48} />;

          if (section.title === 'Menu')
            return (
              <Container mt={24}>
                <HorizontalMenu viewAll={section.viewAll} data={section.data} />
              </Container>
            );

          if (section.title === 'Divider') return <Divider />;

          if (section.title === 'Blog and News')
            return (
              <VerticalSection
                viewAll={section.viewAll}
                title={section.title}
                data={section.data}
              />
            );

          return (
            <HorizontalSection
              viewAll={section.viewAll}
              title={section.title}
              data={section.data}
            />
          );
        }}
        renderItem={() => null}
        onScroll={handleScroll}
        keyExtractor={(item, index) => String(item + index)}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchIcon: { top: 2 },
  topPart: { height: 48 },
  bottomPart: {
    height: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    bottom: 16,
    marginBottom: -56,
  },
});
