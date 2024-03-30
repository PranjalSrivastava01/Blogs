import React ,{useState,useEffect} from 'react'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import PostCard from '../PostCard'
import  {Container}  from '../index'
function AllPosts() {
  const [posts,setPosts]=useState([])
  useEffect(()=>{},[])
  service.getPosts([]).then((posts)=>{
    if(posts)
    {
        setPosts(posts.documents)
    }
  })
  return (
    <div className='w-full py-8'>
        <Container>
            {
                <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        <div key={post.$id}>
                        <PostCard post={post}></PostCard>
                        </div>
                    ))}
                </div>
            }
        </Container>
    </div>
  )
}

export default AllPosts