import './Styles.css';

export const PostCard = ({ cover, id, title, body }) => (
    <div className='post'>
        <img src={cover} alt={title} />
        <div className="post-container">
            <h2 >{title}</h2>
            <p>{body}</p>
        </div>
    </div>
);