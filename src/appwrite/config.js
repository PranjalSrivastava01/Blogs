import conf from "../conf/conf";
import { Client, Account, ID,Databases,Storage,Query } from "appwrite";
//backend as a service 

export class Service{
    client =new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId); 
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId})
    {
        try{
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectcionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        
        )
        }catch(error)
        {
            throw error
        }
    }

        async updatePost(slug,{title,content,featuredImage,status})
        {
         try{
         return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectcionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
         )
         } catch(error)
         {
            throw error
         }
        }

        async deletePost(slug){
            try{
               await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectcionId,
                slug
               )
               return true
            }
            catch(error)
            {
                console.log("delete erorr:",error)
                return false
            }

        }
        async getPost(slug)
        {
            try{
              return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectcionId,
                slug
              )
            }catch(error)
            {
                 console.log("appwrite service::getPost::error",error);
                 return false
            }
        }
        async getPosts(queries=[Query.equal("status","active")]){
         try{
         return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectcionId,
            queries,
         )
         }catch(error)
         {
            console.log("error::getAllposts::",error)
            return false;
         }
        }
    //file upload services
    async uploadFile(file)
    {
     try{
         return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
            )
     } catch(error)
     {
        console.log("error::uploading file::appwrite",error )
        return false
     }
    }
    async deleteFile(fileId)
    {
        try{
          await this.bucket.deleteFile(
               conf.appwriteBucketId,
               fileId
            )
            return true
        } catch(error)
        {
           console.log("error::delete file::appwrite",error )
           return false
        }
    }

    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service=new Service();

export default service 