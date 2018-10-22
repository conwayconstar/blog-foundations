export default function ({store, redirect, route}) {
  // Get isAuthenticated getter from account store
  const isAuthenticated = store.getters['account/isAuthenticated'];
  // Test route to see if is login page or admin page.
  const isAdminUrl = /^\/admin|\/account(\/|$)/.test(route.fullPath);
  const isLoginUrl = /^\/login(\/|$)/.test(route.fullPath);

  // If user is authenticated and is login url
  if (isAuthenticated && isLoginUrl)
    // Redirect to account page
    return redirect('/account');

  // If user is not authenticated and is an admin url
  else if (!isAuthenticated && isAdminUrl)
    // Redirect to login page
    return redirect('/login');

  // Resolve promise
  return Promise.resolve()
}
