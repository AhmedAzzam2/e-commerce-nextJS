// logout function
export default function Logout() {
    // logout http://localhost:8080/api/users/logout by POST

    window.localStorage.removeItem('token');
    window.location.href = '/';
}
