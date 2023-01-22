import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFatching";


const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });
    const [fetchComments, isComLoading] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, []);

    return (
        <div style={{margin: '0 auto', width: '150vh'}}>
            <h1>Вы открыли страницу поста c ID = {params.id}</h1>

            {isLoading
                ? <Loader />
                : <div> {post.id}. {post.title} </div>
            }
            <h1 style={{marginTop: '15px'}}>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader />
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id} style={{marginTop: '15px'}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;