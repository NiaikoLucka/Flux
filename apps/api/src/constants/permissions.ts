// constants/permissions.ts

export const PERMISSIONS = {
  WORKSPACE_DELETE: "workspace:delete",
  WORKSPACE_UPDATE: "workspace:update",
  MEMBER_INVITE: "member:invite",
  MEMBER_UPDATE_ROLE: "member:update_role",
  MEMBER_REMOVE: "member:remove",
  ACCOUNT_CREATE: "account:create",
  ACCOUNT_UPDATE: "account:update",
  ACCOUNT_DELETE: "account:delete",
  TRANSACTION_CREATE: "transaction:create",
  TRANSACTION_UPDATE: "transaction:update",
  // ex: TRANSACTION_DELETE, ACCOUNT_CREATE... à ajouter au besoin
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export type Role = "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  OWNER: Object.values(PERMISSIONS),
  // [
  //   PERMISSIONS.WORKSPACE_DELETE,
  //   PERMISSIONS.WORKSPACE_UPDATE,
  //   PERMISSIONS.MEMBER_INVITE,
  //   PERMISSIONS.MEMBER_UPDATE_ROLE,
  //   PERMISSIONS.MEMBER_REMOVE,
  //   PERMISSIONS.ACCOUNT_CREATE,
  //   PERMISSIONS.ACCOUNT_UPDATE,
  //   PERMISSIONS.ACCOUNT_ARCHIVE,
  //   PERMISSIONS.TRANSACTION_CREATE,
  //   PERMISSIONS.TRANSACTION_UPDATE,
  // ],
  ADMIN: [
    PERMISSIONS.WORKSPACE_UPDATE,
    PERMISSIONS.MEMBER_INVITE,
    PERMISSIONS.MEMBER_UPDATE_ROLE,
    PERMISSIONS.MEMBER_REMOVE,
    PERMISSIONS.ACCOUNT_CREATE,
    PERMISSIONS.ACCOUNT_UPDATE,
    PERMISSIONS.ACCOUNT_DELETE,
    PERMISSIONS.TRANSACTION_CREATE,
    PERMISSIONS.TRANSACTION_UPDATE,
  ],
  EDITOR: [
    PERMISSIONS.TRANSACTION_CREATE,
    PERMISSIONS.TRANSACTION_UPDATE,
  ],
  VIEWER: [], // lecture seule = pas de permission d'écriture
};

export function roleHasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}