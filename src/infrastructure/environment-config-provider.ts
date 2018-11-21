import { EnvironmentConfig, EnvironmentConfigProvider as EnvironmentConfigProviderBase, Storage } from 'ef.lms365';
import { QueryExecuter } from './query-executer';
import { LocalStorage } from './local-storage';
import { SPContext } from './sp-context';

export class EnvironmentConfigProvider extends EnvironmentConfigProviderBase {
    public static readonly instance: EnvironmentConfigProvider = new EnvironmentConfigProvider();

    private readonly _queryExecuter: QueryExecuter;
    private readonly _storage: Storage;

    public constructor() {
        super();

        this._queryExecuter = new QueryExecuter();
        this._storage = new LocalStorage(true);
    }

    public async get(resolve?: (environmentConfig: EnvironmentConfig) => void, reject?: (error: any) => void): Promise<EnvironmentConfig> {
        const spContext = SPContext.instance;

        if (spContext.webUrl) {
            return this.getByWebUrl(spContext.webUrl, resolve, reject);
        }
        else {
            const adalContext = (window as any).AuthenticationContext
                && (window as any).AuthenticationContext.prototype
                && (window as any).AuthenticationContext.prototype._singletonInstance;

            if (adalContext) {
                const user = adalContext.getCachedUser();

                if (user) {
                    const tenantId = user.profile.tid;

                    return this.getByTenantId(tenantId, resolve, reject);
                }
            }
        }
    }

    protected get queryExecuter(): QueryExecuter {
        return this._queryExecuter;
    }

    protected get storage(): Storage {
        return this._storage;
    }
}