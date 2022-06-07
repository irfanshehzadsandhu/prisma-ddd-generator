---
to: App/Infrastructure/IocContainer/container.ts
---
import {Container} from "inversify";
<%for(let i=0;i<names.length;i++){-%>
<%- `import {I${names[i]}Repository, I${names[i]}Id} from "../../Domain/Entities/Address/I${names[i]}Repository";` %>
<%- `import ${names[i]}Repository from "../MySQLRepository/${names[i]}Repository";` %>
<% } -%>

const container = new Container({autoBindInjectable: true, defaultScope: "Singleton"});

<%for(let i=0;i<names.length;i++){-%>
<%- `container.bind<I${names[i]}Repository>(I${names[i]}RepositoryId).to(${names[i]}Repository);` %>
<% } -%>

export default container