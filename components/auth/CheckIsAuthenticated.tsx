// // hoc/withAuth.js
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// // import { isAuthenticated } from '../utils/auth';

// const withAuth = (WrappedComponent: any) => {
//   const AuthenticatedComponent = (props: any) => {
//     const router = useRouter();

//     useEffect(() => {
//       // Check if the user is authenticated
//       const isAuthenticated = localStorage.getItem('token')
//       console.log("🚀 ~ file: CheckIsAuthenticated.tsx:13 ~ useEffect ~ isAuthenticated:", isAuthenticated)
//       if (isAuthenticated) {
//         router.push('/admin');
//       }
//     }, []);

//     return <WrappedComponent {...props} />;
//   };

//   return AuthenticatedComponent;
// };
// export default withAuth
