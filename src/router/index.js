import { createRouter, createWebHistory } from 'vue-router'

// Account Pages
import MyAccount from '../components/pages/MyAccount.vue'
import MySSOApps from '../components/pages/MySSOApps.vue'
import MyGroup from '../components/pages/MyGroup.vue'
import MyAccess from '../components/pages/MyAccess.vue'
import RecentActivity from '../components/pages/RecentActivity.vue'



// Directory Pages
import OrganizationPage from '../components/pages/Directory-management/organizationPage.vue'
import UserPage from '../components/pages/Directory-management/userPage.vue'
import GroupPage from '../components/pages/Directory-management/groupPage.vue'
import DevicePage from '../components/pages/Directory-management/devicePage.vue'
import domainPage from '../components/pages/Directory-management/domainPage.vue'

// Security Pages
import SecuritySettings from '../components/pages/Security-management/SecuritySettings.vue'
import SecurityAudit from '../components/pages/Security-management/SecurityAudit.vue'
import Security2FA from '../components/pages/Security-management/Security2FA.vue'

// MSP Pages
import MspFeature1Page from '../components/pages/Msp-management/feature1Page.vue'
import MspFeature2Page from '../components/pages/Msp-management/feature2Page.vue'
import MspFeature3Page from '../components/pages/Msp-management/feature3Page.vue'

// Workspace Pages
import WorkspaceDashboard from '../components/Workspace-management/WorkspaceDashboard.vue'
import WorkspaceProjects from '../components/Workspace-management/WorkspaceProjects.vue'
import WorkspaceDrive from '../components/Workspace-management/WorkspaceDrive.vue'
import WorkspaceChat from '../components/Workspace-management/WorkspaceChat.vue'
import WorkspaceDomain from '../components/Workspace-management/WorkspaceDomain.vue'

const routes = [

  {
    path: '/',
    redirect: '/directory/organization'
  },
  

  {
    path: '/directory',
    name: 'Directory',
    children: [
      {
        path: 'organization',
        name: 'DirectoryOrganization',
        component: OrganizationPage,
        meta: { title: 'Organization' }
      },
      {
        path: 'users',
        name: 'DirectoryUsers',
        component: UserPage,
        meta: { title: 'Users' }
      },
      {
        path: 'domain',
        name: 'DirectoryDomain',
        component: domainPage,
        meta: { title: 'Domain' }
      },
      {
        path: 'groups',
        name: 'DirectoryGroups',
        component: GroupPage,
        meta: { title: 'Groups' }
      },
      {
        path: 'admin',
        name: 'DirectoryAdmin',
        component: DevicePage,
        meta: { title: 'Admin' }
      }
    ]
  },

  // Account routes
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: { title: 'My Account' }
  },
  {
    path: '/my-sso-apps',
    name: 'MySSOApps',
    component: MySSOApps,
    meta: { title: 'My SSO Apps' }
  },
  {
    path: '/my-group',
    name: 'MyGroup',
    component: MyGroup,
    meta: { title: 'My Group' }
  },
  {
    path: '/my-access',
    name: 'MyAccess',
    component: MyAccess,
    meta: { title: 'My Access' }
  },
  {
    path: '/recent-activity',
    name: 'RecentActivity',
    component: RecentActivity,
    meta: { title: 'Recent Activity' }
  },

  // MSP routes
  {
    path: '/msp',
    name: 'MSP',
    children: [
      {
        path: 'feature-1',
        name: 'MspFeature1',
        component: MspFeature1Page,
        meta: { title: 'MSP Feature 1' }
      },
      {
        path: 'feature-2',
        name: 'MspFeature2',
        component: MspFeature2Page,
        meta: { title: 'MSP Feature 2' }
      },
      {
        path: 'feature-3',
        name: 'MspFeature3',
        component: MspFeature3Page,
        meta: { title: 'MSP Feature 3' }
      }
    ]
  },

  // Workspace routes
  {
    path: '/workspace',
    name: 'Workspace',
    children: [
      {
        path: 'dashboard',
        name: 'WorkspaceDashboard',
        component: WorkspaceDashboard,
        meta: { title: 'Workspace Dashboard' }
      },
      {
        path: 'projects',
        name: 'WorkspaceProjects',
        component: WorkspaceProjects,
        meta: { title: 'Projects' }
      },
      {
        path: 'drive',
        name: 'WorkspaceDrive',
        component: WorkspaceDrive,
        meta: { title: 'Drive' }
      },
      {
        path: 'chat',
        name: 'WorkspaceChat',
        component: WorkspaceChat,
        meta: { title: 'Chat' }
      },
      {
        path: 'domain',
        name: 'WorkspaceDomain',
        component: WorkspaceDomain,
        meta: { title: 'Domain Management' }
      }
    ]
  },
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   component: () => import('../components/pages/Settings.vue'),
  //   meta: { title: 'Settings' }

  // },

  // Security routes
  {
    path: '/security',
    name: 'Security',
    children: [
      {
        path: 'settings',
        name: 'SecuritySettings',
        component: SecuritySettings,
        meta: { title: 'Security Settings' }
      },
      {
        path: '2fa',
        name: 'Security2FA',
        component: Security2FA,
        meta: { title: 'Two-Factor Authentication' }
      },
      {
        path: 'audit',
        name: 'SecurityAudit',
        component: SecurityAudit,
        meta: { title: 'Security Audit' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Add route guard to set document title
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ? `${to.meta.title} | Your App` : 'Your App'
  next()
})

export default router