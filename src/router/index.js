import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Maps from '@/components/pages/Maps'
import Documents from '@/components/pages/Documents'
import PageRedirect from '@/components/widgets/PageRedirect'
import CraDs from '@/components/pages/CraDs'
import Crva from '@/components/pages/Crva'
import MonitoringEvaluation from '@/components/pages/MonitoringEvaluation'

import CraCountryProfile from '@/components/subpages/crads/CraCountryProfile'
import ClimateRiskProfiles from '@/components/subpages/crads/ClimateRiskProfiles'
import Cba from '@/components/subpages/crads/Cba'

import InvestmentBriefsOne from '@/components/subpages/crads/subitems/InvestmentBriefsOne'
import InvestmentBriefsTwo from '@/components/subpages/crads/subitems/InvestmentBriefsTwo'
import TechnicalBriefsTwo from '@/components/subpages/crads/subitems/TechnicalBriefsTwo'

import Strategy from '@/components/subpages/me/Strategy'
import TrackingTools from '@/components/subpages/me/TrackingTools'
import Questionnaires from '@/components/subpages/me/Questionnaires'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/maps',
      name: 'Maps',
      component: Maps
    },
    {
      path: '/documents',
      name: 'Documents',
      component: Documents
    },
    {
      path: '/crads',
      name: 'crads',
      component: CraDs
    },
    {
      path: '/crva',
      name: 'crva',
      component: Crva
    },
    {
      path: '/me',
      name: 'me',
      component: MonitoringEvaluation
    },
    {
      path: '/crads/cra',
      name: 'cra',
      component: CraCountryProfile
    },
    {
      path: '/crads/crp',
      name: 'crp',
      component: ClimateRiskProfiles
    },
    {
      path: '/crads/cba',
      name: 'cba',
      component: Cba
    },
    {
      path: '/crads/cba/investbriefs1',
      name: 'investbriefs1',
      component: InvestmentBriefsOne
    },
    {
      path: '/crads/cba/investbriefs2',
      name: 'investbriefs2',
      component: InvestmentBriefsTwo
    },
    {
      path: '/crads/cba/techbriefs2',
      name: 'techbriefs2',
      component: TechnicalBriefsTwo
    },
    {
      path: '/me/strategy',
      name: 'strategy',
      component: Strategy
    },
    {
      path: '/me/tools',
      name: 'tools',
      component: TrackingTools
    },
    {
      path: '/me/questionnaires',
      name: 'questionnaires',
      component: Questionnaires
    },
    {
      path: '/:projects',
      name: 'PageRedirect',
      component: PageRedirect
    }
  ]
})
