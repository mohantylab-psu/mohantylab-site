export const allowedAdminEmail = import.meta.env.VITE_NEWS_ADMIN_EMAIL?.trim().toLowerCase() ?? '';

export const isAuthorizedCoordinatorEmail = (email?: string | null) => {
  if (!email) {
    return false;
  }

  if (!allowedAdminEmail) {
    return true;
  }

  return email.trim().toLowerCase() === allowedAdminEmail;
};
