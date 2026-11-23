
import SettingsSideBar from '../../components/settings/settingsSideBar';
import { Outlet } from 'react-router';
import Card from '../../components/ui/card';

const SettingsPage = () => {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <section className="space-y-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Paramètres</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Gérez votre compte et votre espace de travail.
          </p>
        </div>

        {/* TODO: gerer le settings */}
        <div className="flex items-start gap-10">
          <SettingsSideBar />

          <Card className='min-w-0 flex-1 w-full h-auto px-4 py-2'>
            <Outlet/>
          </Card>
        </div>
        
      </section>
    </div>
  );
};

export default SettingsPage;
