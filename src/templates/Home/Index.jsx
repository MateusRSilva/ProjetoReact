import './Style.css';
import React, { useEffect, useState, useCallback } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts/index';
import { Button } from '../../components/Button/index'
import { TextInput } from '../../components/textInput/Index';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filterPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    :
    posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postAndPhoto = await loadPosts();

    setPosts(postAndPhoto.slice(page, postsPerPage));
    setAllPosts(postAndPhoto);
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  }
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  return (
    <section className='container'>
      <div className='Search-Container'>
        {!!searchValue && (
          <h1>Search Value : {searchValue}</h1>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filterPosts.length > 0 && (
        <Posts
          posts={filterPosts}
        />
      )}
      {filterPosts.length === 0 && (
        <p>Não existe posts</p>
      )}
      <div className='button-container'>
        {!searchValue && (
          <>
            <Button text="Load more posts"
              clicado={loadMorePosts}
              disabled={noMorePosts}
            />
          </>
        )}
      </div>
    </section>
  )
}
