import BlogList from "./components/BlogList.vue"
import AddBlog from "./components/AddBlog.vue"
import Login from "./components/Login.vue"
import Blog from "./components/Blog.vue"
import NewUser from "./components/NewUser.vue"

export default [
    { path: "/", component: BlogList },
    { path: "/add", component: AddBlog },
    { path: "/login", component: Login },
    { path: "/newUser", component: NewUser },
    { path: "/blog/:id", component: Blog }
]
