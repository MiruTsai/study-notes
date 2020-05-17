import BlogList from "./components/BlogList.vue"
import AddBlog from "./components/AddBlog.vue"
import Login from "./components/Login.vue"
import Blog from "./components/Blog.vue"

export default [
    { path: "/", component: BlogList },
    { path: "/add", component: AddBlog },
    { path: "/login", component: Login },
    { path: "/blog/:id",component:Blog}
]
