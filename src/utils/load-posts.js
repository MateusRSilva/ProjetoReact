export const loadPosts =async() => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponsive = fetch('https://jsonplaceholder.typicode.com/photos')
    
    const [posts, photos] = await Promise.all([postResponse, photosResponsive]);
    
    const postsJson = await posts.json();
    const photosJson = await photos.json();
    
    const postAndPhoto = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });
    return postAndPhoto;
}