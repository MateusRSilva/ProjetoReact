import './Style.css';
import React, { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts/index';
import { Button } from '../../components/Button/index'
import { TextInput } from '../../components/textInput/Index';
export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  };
  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postAndPhoto = await loadPosts();
    this.setState({
      posts: postAndPhoto.slice(page, postsPerPage),
      allPosts: postAndPhoto
    });
  }
  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }
  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filterPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      :
      posts;
    return (
      <section className='container'>
        <div className='Search-Container'>
          {!!searchValue && (
            <h1>Search Value : {searchValue}</h1>
          )}
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
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
                clicado={this.loadMorePosts}
                disabled={noMorePosts}
              />
            </>
          )}
        </div>
      </section>
    )
  }
}
