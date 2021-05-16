<template>
  <div>
      <ul v-if="posts && posts.length">
        <li v-for="(post, index) of posts" :key="index">
        <p><strong>{{post.username}}</strong></p>
        <p>{{post.fullname}}</p>
        </li>
     </ul>

    <ul v-if="errors && errors.length">
        <li v-for="(error, index) of errors" :key="index">
        {{error.message}}
        </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
    return {
      posts: [],
      errors: []
    }
  },
  // data() {
//     return{
//         username: '',
//         fullname: '',
//         email: '',
//         address: '',
//         course: '',
//         students: []
//     }
// },
    // asyncData(){
    //     return axios.get('http://localhost:8081/api/student/getAll')
    //     .then(res => 
    //         // this.students.push({ 
    //         //     username: res.data.username,
    //         //     fullname: res.data.fullname,
    //         //     email: res.data.email,
    //         //     address: res.data.address,
    //         //     course: res.data.course,
    //         // })
    //        {console.log(res.data);}
    //     )
    // }
    created() {
        console.log("axios");
        axios.get(`http://localhost:8081/api/student/getAll`)
        .then(response => {
            this.posts = response.data
        })
        .catch(e => {
            this.errors.push(e)
        })
    }
}
</script>

<style>

</style>