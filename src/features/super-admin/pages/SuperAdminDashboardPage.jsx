import DashboardSection from "../components/dashboard/DashboardSection";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";
import SubscriptionOverview from "../components/dashboard/SubscriptionOverview";
import RevenueChart from "../components/dashboard/RevenueChart";
import SchoolGrowthChart from "../components/dashboard/SchoolGrowthChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import SystemHealth from "../components/dashboard/SystemHealth";
import QuickActions from "../components/dashboard/QuickActions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from "../../../components/ui/cards/Card";
import {
  platformOverview,
  subscriptionOverview,
  revenueTrend,
  schoolGrowth,
  recentActivity,
  systemHealth,
  quickActions,
} from "../data/dashboardViewModel";

const SuperAdminDashboardPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-text">Dashboard</h1>
        <p className="mt-1.5 text-sm text-text-muted">
          Overview across every school on the platform.
        </p>
      </div>

      <DashboardSection title="Platform Overview">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platformOverview.map((stat) => (
            <DashboardStatCard key={stat.id} {...stat} />
          ))}
        </div>
      </DashboardSection>

      <DashboardSection title="Subscriptions & Billing">
        <SubscriptionOverview
          stats={subscriptionOverview.stats}
          planDistribution={subscriptionOverview.planDistribution}
        />
      </DashboardSection>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardSection title="Revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue trend</CardTitle>
            </CardHeader>
            <CardBody>
              <RevenueChart data={revenueTrend} />
            </CardBody>
          </Card>
        </DashboardSection>

        <DashboardSection title="School Growth">
          <Card>
            <CardHeader>
              <CardTitle>Schools on platform</CardTitle>
            </CardHeader>
            <CardBody>
              <SchoolGrowthChart data={schoolGrowth} />
            </CardBody>
          </Card>
        </DashboardSection>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardSection title="Platform Activity">
          <RecentActivity activities={recentActivity} />
        </DashboardSection>

        <DashboardSection title="System Health">
          <SystemHealth checks={systemHealth} />
        </DashboardSection>
      </div>

      <DashboardSection title="Quick Actions">
        <QuickActions actions={quickActions} />
      </DashboardSection>
    </div>
  );
};

export default SuperAdminDashboardPage;
