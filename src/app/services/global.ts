import { environment } from "src/environments/environment"

export var global = {
    url: environment.url,
    urlStorageCustomers: environment.urlStorageCustomers,
    urlProject: environment.projectPath,
    googleKey: environment.googleKey,
}
