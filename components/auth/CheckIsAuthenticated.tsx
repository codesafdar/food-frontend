// import React, { useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { useLayoutEffect } from 'react';


// const CheckIsAuthenticated = (WrappedComponent: any) => {
//   const WithAuth = (props: any) => {
//     const router = useRouter();

//     // Check authentication status (e.g., from Redux, context, etc.)
//     const isAuthenticated = false

//     useLayoutEffect(() => {
//       if (!isAuthenticated) {
//         router.push('auth/login'); // Redirect to login page if not authenticated
//       }
//     }, [isAuthenticated, router]);

//     if (!isAuthenticated) {
//       return <div>Loading...</div>; // Or a loading spinner while checking authentication
//     }

//     return <WrappedComponent {...props} />;
//   };

//   return WithAuth;
// }

// export default CheckIsAuthenticated