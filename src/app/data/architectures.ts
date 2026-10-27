import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { Diagram } from '../shared/diagram/diagram.model';

/*
 * Conteúdo educativo do Architecture Explorer. Os diagramas são exemplos
 * genéricos de cada padrão, não representações de sistemas de empresas reais.
 */

export type ArchitectureId = 'monolith' | 'microservices' | 'event-driven' | 'bpmn';

export type CriterionId =
  | 'complexity'
  | 'scalability'
  | 'maintainability'
  | 'operations'
  | 'faultTolerance'
  | 'deployment';

export interface ComponentDetail {
  responsibility: string;
  technologies: string[];
  benefits: string[];
  tradeOffs: string[];
  challenges: string[];
}

export interface Concept {
  title: string;
  text: string;
}

/** Avaliação qualitativa: uma tendência e o contexto do qual ela depende. */
export interface CriterionAssessment {
  tendency: string;
  context: string;
}

export interface Architecture {
  id: ArchitectureId;
  name: string;
  /** Nome usado nas abas e seletores */
  shortName: string;
  icon: [IconPrefix, IconName];
  tagline: string;
  summary: string;
  whenToUse: string[];
  strengths: string[];
  limitations: string[];
  scaling: string[];
  concepts: Concept[];
  diagram: Diagram;
  /** Detalhes por id de nó do diagrama */
  components: Record<string, ComponentDetail>;
  assessment: Record<CriterionId, CriterionAssessment>;
}

export const compareCriteria: { id: CriterionId; label: string }[] = [
  { id: 'complexity', label: 'Complexity' },
  { id: 'scalability', label: 'Scalability' },
  { id: 'maintainability', label: 'Maintainability' },
  { id: 'operations', label: 'Operational overhead' },
  { id: 'faultTolerance', label: 'Fault tolerance' },
  { id: 'deployment', label: 'Deployment flexibility' },
];

const monolith: Architecture = {
  id: 'monolith',
  name: 'Modern Monolith',
  shortName: 'Modern Monolith',
  icon: ['fas', 'cube'],
  tagline: 'One deployable application, organized into well-defined modules.',
  summary:
    'A single application that is built, tested and deployed as one unit, but internally split into modules with clear boundaries. Each module owns its domain logic and exposes a small internal API, which keeps the codebase cohesive without paying the cost of distribution.',
  whenToUse: [
    'New products or teams that are still discovering the domain boundaries.',
    'Small to medium teams that deploy together.',
    'Workloads where strong transactional consistency matters more than independent scaling.',
  ],
  strengths: [
    'Simple local development, debugging and end-to-end testing.',
    'In-process calls: no network latency or partial failures between modules.',
    'ACID transactions across modules using a single database.',
    'One pipeline, one artifact and one runtime to operate.',
  ],
  limitations: [
    'The whole application is redeployed for any change.',
    'Every module scales together, even if only one is under load.',
    'Without discipline, module boundaries erode into a "big ball of mud".',
    'A single technology stack for the entire codebase.',
  ],
  scaling: [
    'Scale horizontally with stateless instances behind a load balancer.',
    'Add caching and read replicas before considering distribution.',
    'Enforce module boundaries (packages, ArchUnit tests) so modules can be extracted later.',
    'Extract a module into a service only when it has a clear, measured reason to scale or deploy independently.',
  ],
  concepts: [
    {
      title: 'Modular boundaries',
      text: 'Modules communicate through explicit interfaces instead of reaching into each other’s tables or classes. This keeps coupling visible and controlled.',
    },
    {
      title: 'Layered modules',
      text: 'Each module separates API, domain and infrastructure concerns, often following Clean or Hexagonal Architecture, so business rules do not depend on frameworks.',
    },
    {
      title: 'Single deployment unit',
      text: 'Versioning and releases are simple because everything ships together, at the cost of coordinating changes across the whole application.',
    },
    {
      title: 'Evolution path',
      text: 'A well-modularized monolith is the safest starting point for a later move to services: boundaries are already proven by real usage.',
    },
  ],
  diagram: {
    title: 'Modern Monolith',
    width: 800,
    height: 380,
    groups: [{ id: 'app', label: 'Spring Boot application · single deployable', x: 214, y: 20, w: 384, h: 340 }],
    nodes: [
      {
        id: 'spa',
        label: 'Angular SPA',
        caption: 'Web client',
        summary: 'Browser application that consumes the backend REST API.',
        icon: ['fas', 'display'],
        tone: 'info',
        x: 20,
        y: 158,
        w: 150,
        h: 64,
      },
      {
        id: 'api',
        label: 'REST API layer',
        caption: 'Controllers · validation · security',
        summary: 'Single entry point that authenticates requests and delegates to the right module.',
        icon: ['fas', 'shield-halved'],
        tone: 'accent',
        x: 236,
        y: 52,
        w: 340,
        h: 60,
      },
      {
        id: 'orders',
        label: 'Orders',
        caption: 'Module',
        summary: 'Owns the order lifecycle and its business rules.',
        icon: ['fas', 'puzzle-piece'],
        tone: 'accent',
        x: 236,
        y: 158,
        w: 96,
        h: 64,
      },
      {
        id: 'billing',
        label: 'Billing',
        caption: 'Module',
        summary: 'Calculates invoices and payments through its own internal API.',
        icon: ['fas', 'puzzle-piece'],
        tone: 'accent',
        x: 358,
        y: 158,
        w: 96,
        h: 64,
      },
      {
        id: 'identity',
        label: 'Identity',
        caption: 'Module',
        summary: 'Users, roles and permissions shared by the other modules.',
        icon: ['fas', 'puzzle-piece'],
        tone: 'accent',
        x: 480,
        y: 158,
        w: 96,
        h: 64,
      },
      {
        id: 'persistence',
        label: 'Persistence layer',
        caption: 'Spring Data JPA · Hibernate',
        summary: 'Repositories and transactions; each module maps only its own tables.',
        icon: ['fas', 'layer-group'],
        tone: 'neutral',
        x: 236,
        y: 272,
        w: 340,
        h: 60,
      },
      {
        id: 'db',
        label: 'Relational database',
        caption: 'Oracle / PostgreSQL',
        summary: 'Single database, with one schema or table prefix per module.',
        icon: ['fas', 'database'],
        tone: 'success',
        x: 634,
        y: 270,
        w: 150,
        h: 64,
      },
    ],
    edges: [
      { from: 'spa', to: 'api', mode: 'sync', label: 'HTTPS / JSON', toSide: 'left' },
      { from: 'api', to: 'orders', mode: 'sync' },
      { from: 'api', to: 'billing', mode: 'sync' },
      { from: 'api', to: 'identity', mode: 'sync' },
      { from: 'orders', to: 'billing', mode: 'sync' },
      { from: 'orders', to: 'persistence', mode: 'sync' },
      { from: 'billing', to: 'persistence', mode: 'sync' },
      { from: 'identity', to: 'persistence', mode: 'sync' },
      { from: 'persistence', to: 'db', mode: 'sync', label: 'JDBC' },
    ],
  },
  components: {
    spa: {
      responsibility: 'Renders the user interface and calls the backend through a versioned REST API.',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Bootstrap'],
      benefits: ['Rich, responsive user experience.', 'Frontend can evolve its UI without backend releases.'],
      tradeOffs: ['Requires a stable API contract.', 'Initial load and bundle size need attention.'],
      challenges: ['Handling authentication tokens securely.', 'Keeping API models in sync with the backend.'],
    },
    api: {
      responsibility:
        'Receives HTTP requests, validates input, applies security and routes each call to the module that owns the use case.',
      technologies: ['Spring Boot', 'Spring Web', 'Spring Security', 'Bean Validation', 'OpenAPI'],
      benefits: ['One consistent place for cross-cutting concerns.', 'Thin controllers keep business logic in modules.'],
      tradeOffs: ['Can become a dumping ground for logic if not kept thin.'],
      challenges: ['Versioning the API without breaking clients.', 'Consistent error handling across modules.'],
    },
    orders: {
      responsibility: 'Implements the order domain: creation, state transitions and business validations.',
      technologies: ['Java', 'Spring Boot', 'Domain model', 'JUnit', 'Mockito'],
      benefits: ['High cohesion: everything about orders lives in one place.', 'Easy to test in isolation.'],
      tradeOffs: ['Calls to other modules must go through their public API, which requires discipline.'],
      challenges: ['Avoiding direct access to other modules’ tables.', 'Keeping transactions short.'],
    },
    billing: {
      responsibility: 'Owns invoicing and payment rules and exposes them to other modules through an internal interface.',
      technologies: ['Java', 'Spring Boot', 'Domain events (in-process)'],
      benefits: ['Clear ownership of financial rules.', 'Can be extracted into a service later if needed.'],
      tradeOffs: ['Shares the deployment and runtime resources of the whole application.'],
      challenges: ['Preventing cyclic dependencies between modules.'],
    },
    identity: {
      responsibility: 'Manages users, roles and permissions used by the other modules.',
      technologies: ['Spring Security', 'JWT / OAuth 2.0', 'JPA'],
      benefits: ['Centralized and consistent authorization rules.'],
      tradeOffs: ['A change here can affect every module.'],
      challenges: ['Keeping permission checks close to the use cases that need them.'],
    },
    persistence: {
      responsibility: 'Maps domain entities to tables and manages transactions and connection pooling.',
      technologies: ['Spring Data JPA', 'Hibernate', 'HikariCP', 'Flyway / Liquibase'],
      benefits: ['ACID transactions across modules when needed.', 'One consistent data-access approach.'],
      tradeOffs: ['A shared database makes it tempting to couple modules through joins.'],
      challenges: ['N+1 queries and lazy-loading pitfalls.', 'Schema migrations for the whole application.'],
    },
    db: {
      responsibility: 'Stores the data of all modules, ideally separated by schema or naming convention.',
      technologies: ['Oracle', 'PostgreSQL', 'SQL Server'],
      benefits: ['Strong consistency and mature tooling.', 'Simple backups and reporting.'],
      tradeOffs: ['Becomes a shared scaling bottleneck under heavy load.'],
      challenges: ['Indexing and query tuning as data grows.', 'Long-running migrations.'],
    },
  },
  assessment: {
    complexity: {
      tendency: 'Lower at the start',
      context: 'Grows with the codebase if module boundaries are not enforced.',
    },
    scalability: {
      tendency: 'Scales as a whole',
      context: 'Horizontal scaling works well for stateless apps; individual hot spots cannot scale on their own.',
    },
    maintainability: {
      tendency: 'Good while modular',
      context: 'Depends heavily on boundary discipline, code reviews and architecture tests.',
    },
    operations: {
      tendency: 'Lower overhead',
      context: 'One artifact, one pipeline and one runtime to monitor.',
    },
    faultTolerance: {
      tendency: 'Shared failure domain',
      context: 'A memory leak or crash in one module affects the whole process; redundancy comes from multiple instances.',
    },
    deployment: {
      tendency: 'All modules ship together',
      context: 'Simple versioning, but releases require coordination across teams.',
    },
  },
};

const microservices: Architecture = {
  id: 'microservices',
  name: 'Microservices',
  shortName: 'Microservices',
  icon: ['fas', 'cubes'],
  tagline: 'Independently deployable services, each owning its business capability and data.',
  summary:
    'The system is split into small services aligned with business capabilities. Each service has its own codebase, database and release cycle, and services communicate through APIs and asynchronous events.',
  whenToUse: [
    'Several teams need to deliver independently on different business capabilities.',
    'Parts of the system have very different scaling or availability requirements.',
    'The organization can invest in automation, observability and platform tooling.',
  ],
  strengths: [
    'Independent deployment and scaling per service.',
    'Fault isolation: one failing service does not have to bring down the rest.',
    'Teams can own a service end to end.',
    'Freedom to choose the right technology per service.',
  ],
  limitations: [
    'Network calls introduce latency and partial failures.',
    'Data consistency across services is eventual and harder to reason about.',
    'Significant operational overhead: pipelines, monitoring, tracing, security.',
    'Poorly chosen boundaries lead to a "distributed monolith".',
  ],
  scaling: [
    'Scale only the services under load, usually with containers and orchestration.',
    'Use asynchronous messaging to absorb peaks and decouple producers from consumers.',
    'Apply resilience patterns (timeouts, retries, circuit breakers) on every remote call.',
    'Invest in distributed tracing before the number of services grows.',
  ],
  concepts: [
    {
      title: 'Service boundaries',
      text: 'Boundaries follow business capabilities (bounded contexts in DDD), not technical layers. A good boundary minimizes chatty calls between services.',
    },
    {
      title: 'Independent deployment',
      text: 'Each service is versioned and released on its own. Backward-compatible APIs and contract tests make this safe.',
    },
    {
      title: 'Fault isolation',
      text: 'Timeouts, circuit breakers and bulkheads keep a slow dependency from exhausting the resources of its callers.',
    },
    {
      title: 'Distributed tracing',
      text: 'A trace id propagated across calls and messages makes it possible to follow one request through many services.',
    },
    {
      title: 'Data consistency',
      text: 'Each service owns its data. Cross-service workflows rely on events, the Saga pattern and the transactional outbox instead of distributed transactions.',
    },
  ],
  diagram: {
    title: 'Microservices',
    width: 860,
    height: 480,
    nodes: [
      {
        id: 'spa',
        label: 'Angular SPA',
        caption: 'Web client',
        summary: 'Calls the system through a single public entry point.',
        icon: ['fas', 'display'],
        tone: 'info',
        x: 260,
        y: 16,
        w: 150,
        h: 60,
      },
      {
        id: 'gateway',
        label: 'API Gateway',
        caption: 'Routing · auth · rate limits',
        summary: 'Routes requests to services and centralizes authentication and rate limiting.',
        icon: ['fas', 'shield-halved'],
        tone: 'accent',
        x: 250,
        y: 128,
        w: 170,
        h: 64,
      },
      {
        id: 'observability',
        label: 'Observability',
        caption: 'Traces · metrics · logs',
        summary: 'Collects telemetry from the gateway and every service.',
        icon: ['fas', 'chart-line'],
        tone: 'neutral',
        x: 650,
        y: 128,
        w: 180,
        h: 64,
      },
      {
        id: 'orders',
        label: 'Order Service',
        caption: 'Spring Boot',
        summary: 'Owns orders and publishes an OrderPlaced event.',
        icon: ['fas', 'cube'],
        tone: 'accent',
        x: 16,
        y: 268,
        w: 150,
        h: 64,
      },
      {
        id: 'broker',
        label: 'Message broker',
        caption: 'Kafka / RabbitMQ',
        summary: 'Delivers events between services asynchronously.',
        icon: ['fas', 'right-left'],
        tone: 'warning',
        x: 250,
        y: 268,
        w: 170,
        h: 64,
      },
      {
        id: 'payments',
        label: 'Payment Service',
        caption: 'Spring Boot',
        summary: 'Reacts to OrderPlaced and processes the payment.',
        icon: ['fas', 'cube'],
        tone: 'accent',
        x: 480,
        y: 268,
        w: 160,
        h: 64,
      },
      {
        id: 'catalog',
        label: 'Catalog Service',
        caption: 'Spring Boot',
        summary: 'Serves products and prices; read-heavy and scaled separately.',
        icon: ['fas', 'cube'],
        tone: 'accent',
        x: 680,
        y: 268,
        w: 160,
        h: 64,
      },
      {
        id: 'ordersDb',
        label: 'Orders DB',
        caption: 'PostgreSQL',
        summary: 'Private to the Order Service.',
        icon: ['fas', 'database'],
        tone: 'success',
        x: 21,
        y: 404,
        w: 140,
        h: 60,
      },
      {
        id: 'paymentsDb',
        label: 'Payments DB',
        caption: 'Oracle',
        summary: 'Private to the Payment Service.',
        icon: ['fas', 'database'],
        tone: 'success',
        x: 490,
        y: 404,
        w: 140,
        h: 60,
      },
      {
        id: 'catalogDb',
        label: 'Catalog DB',
        caption: 'MongoDB',
        summary: 'Private to the Catalog Service; a document store fits its read model.',
        icon: ['fas', 'database'],
        tone: 'success',
        x: 690,
        y: 404,
        w: 140,
        h: 60,
      },
    ],
    edges: [
      { from: 'spa', to: 'gateway', mode: 'sync', label: 'HTTPS' },
      { from: 'gateway', to: 'orders', mode: 'sync', label: 'REST', fromSide: 'bottom', toSide: 'top' },
      { from: 'gateway', to: 'payments', mode: 'sync', fromSide: 'bottom', toSide: 'top' },
      { from: 'gateway', to: 'catalog', mode: 'sync', fromSide: 'bottom', toSide: 'top' },
      { from: 'gateway', to: 'observability', mode: 'async', label: 'traces' },
      { from: 'orders', to: 'broker', mode: 'async', label: 'OrderPlaced' },
      { from: 'broker', to: 'payments', mode: 'async' },
      { from: 'orders', to: 'ordersDb', mode: 'sync' },
      { from: 'payments', to: 'paymentsDb', mode: 'sync' },
      { from: 'catalog', to: 'catalogDb', mode: 'sync' },
    ],
  },
  components: {
    spa: {
      responsibility: 'User interface that talks only to the API Gateway, never directly to internal services.',
      technologies: ['Angular', 'TypeScript', 'RxJS'],
      benefits: ['Internal topology can change without impacting the client.'],
      tradeOffs: ['Screens that aggregate data from many services may need a dedicated backend-for-frontend.'],
      challenges: ['Handling partial responses when one service is degraded.'],
    },
    gateway: {
      responsibility:
        'Single public entry point: routes requests, validates tokens, applies rate limits and propagates the trace id.',
      technologies: ['Spring Cloud Gateway', 'OAuth 2.0 / JWT', 'Resilience4j'],
      benefits: ['Cross-cutting concerns in one place.', 'Hides internal service addresses.'],
      tradeOffs: ['Extra network hop.', 'Must be highly available, or it becomes a single point of failure.'],
      challenges: ['Keeping business logic out of the gateway.', 'Route configuration as services evolve.'],
    },
    observability: {
      responsibility: 'Aggregates distributed traces, metrics and structured logs from all components.',
      technologies: ['OpenTelemetry', 'Prometheus', 'Grafana', 'ELK / OpenSearch'],
      benefits: ['End-to-end visibility of each request.', 'Faster root-cause analysis.'],
      tradeOffs: ['Storage and licensing costs grow with traffic.'],
      challenges: ['Consistent trace-id propagation, including through messages.', 'Alerting without noise.'],
    },
    orders: {
      responsibility: 'Manages the order lifecycle and publishes domain events when an order changes state.',
      technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'Transactional outbox'],
      benefits: ['Deployed and scaled independently.', 'Small, focused codebase.'],
      tradeOffs: ['Needs other services’ data through APIs or events instead of joins.'],
      challenges: ['Publishing events reliably together with the database transaction (outbox pattern).'],
    },
    broker: {
      responsibility: 'Transports events between services so producers do not depend on consumers being available.',
      technologies: ['Apache Kafka', 'RabbitMQ'],
      benefits: ['Temporal decoupling and peak absorption.', 'New consumers can be added without changing producers.'],
      tradeOffs: ['Eventual consistency.', 'Another critical piece of infrastructure to run.'],
      challenges: ['Schema evolution of events.', 'Monitoring consumer lag and failed messages.'],
    },
    payments: {
      responsibility: 'Consumes OrderPlaced events, processes payments and publishes the result.',
      technologies: ['Java', 'Spring Boot', 'Spring Kafka / Spring AMQP'],
      benefits: ['Can be scaled for payment peaks without scaling the rest.'],
      tradeOffs: ['The order is confirmed asynchronously, which the UI must reflect.'],
      challenges: ['Idempotent processing of duplicated events.', 'Compensating actions when a payment fails (Saga).'],
    },
    catalog: {
      responsibility: 'Serves product and price information, typically with heavy read traffic.',
      technologies: ['Java', 'Spring Boot', 'Caching'],
      benefits: ['Read-optimized storage and caching without affecting other services.'],
      tradeOffs: ['Other services may hold slightly stale copies of catalog data.'],
      challenges: ['Cache invalidation.', 'Keeping its API backward compatible.'],
    },
    ordersDb: {
      responsibility: 'Stores order data, accessible only by the Order Service.',
      technologies: ['PostgreSQL'],
      benefits: ['Schema can change without coordinating with other teams.'],
      tradeOffs: ['No cross-service joins; reporting needs a separate data pipeline.'],
      challenges: ['Backups and migrations multiplied by the number of services.'],
    },
    paymentsDb: {
      responsibility: 'Stores payment data, accessible only by the Payment Service.',
      technologies: ['Oracle'],
      benefits: ['Technology chosen for the needs of the payment domain.'],
      tradeOffs: ['Different databases increase operational knowledge required.'],
      challenges: ['Auditing and consistency with order data.'],
    },
    catalogDb: {
      responsibility: 'Stores the product catalog in a model optimized for reads.',
      technologies: ['MongoDB'],
      benefits: ['Flexible document model for varied product attributes.'],
      tradeOffs: ['Weaker multi-document transactional guarantees than relational databases.'],
      challenges: ['Designing documents around query patterns.'],
    },
  },
  assessment: {
    complexity: {
      tendency: 'Higher overall',
      context: 'Each service is simple, but the system as a whole is distributed and harder to reason about.',
    },
    scalability: {
      tendency: 'Fine-grained',
      context: 'Each service scales independently, which pays off when load is uneven across capabilities.',
    },
    maintainability: {
      tendency: 'Good with clear boundaries',
      context: 'Small codebases are easy to change; wrong boundaries cause cascading changes across services.',
    },
    operations: {
      tendency: 'Higher overhead',
      context: 'Requires CI/CD per service, container orchestration, centralized logging and tracing.',
    },
    faultTolerance: {
      tendency: 'Isolation is possible',
      context: 'Only with timeouts, circuit breakers and asynchronous communication; otherwise failures cascade.',
    },
    deployment: {
      tendency: 'Independent releases',
      context: 'Each team ships on its own schedule, provided APIs stay backward compatible.',
    },
  },
};

const eventDriven: Architecture = {
  id: 'event-driven',
  name: 'Event-Driven Architecture',
  shortName: 'Event-Driven',
  icon: ['fas', 'bolt'],
  tagline: 'Components react to events published to a broker instead of calling each other directly.',
  summary:
    'Producers publish facts ("an order was placed") or commands ("generate an invoice") to a message broker. Consumers process them asynchronously, at their own pace. Kafka works as a durable, replayable event log; RabbitMQ works as a flexible message router with queues and acknowledgements.',
  whenToUse: [
    'High-volume or bursty workloads that must be absorbed without losing data.',
    'Several independent reactions to the same business event.',
    'Integrations where systems should not depend on each other being online.',
  ],
  strengths: [
    'Loose coupling: producers do not know who consumes their events.',
    'Peak absorption and back-pressure through queues and partitions.',
    'Easy to add new consumers for new features.',
    'With Kafka, events can be replayed to rebuild state or feed new systems.',
  ],
  limitations: [
    'Eventual consistency: results are not visible immediately.',
    'Harder to trace and debug a business flow end to end.',
    'Requires careful handling of duplicates, ordering and poison messages.',
    'Event schemas become public contracts that must evolve carefully.',
  ],
  scaling: [
    'Kafka: scale consumers up to the number of partitions in a consumer group; choose partition keys that preserve the required ordering.',
    'RabbitMQ: scale with competing consumers on the same queue and tune prefetch.',
    'Use retry queues with backoff and a dead-letter queue to keep failures from blocking the flow.',
    'Monitor consumer lag and queue depth as primary scaling signals.',
  ],
  concepts: [
    {
      title: 'Asynchronous communication',
      text: 'The producer publishes and moves on. The broker persists the message until a consumer processes it, decoupling both sides in time.',
    },
    {
      title: 'Kafka vs RabbitMQ',
      text: 'Kafka keeps an ordered, partitioned log that consumers read by offset and can replay. RabbitMQ routes messages to queues through exchanges and removes them once acknowledged.',
    },
    {
      title: 'Retry strategies',
      text: 'Transient failures are retried with exponential backoff, usually through delayed retry queues or topics, instead of blocking the main flow.',
    },
    {
      title: 'Dead-letter queues',
      text: 'Messages that keep failing are moved to a DLQ for inspection and reprocessing, so one bad message does not stop the consumer.',
    },
    {
      title: 'Idempotency',
      text: 'Brokers usually guarantee at-least-once delivery. Consumers must handle duplicates safely, for example with unique keys or processed-message tables.',
    },
    {
      title: 'Eventual consistency',
      text: 'Each consumer updates its own state when it processes the event. The system converges, and the UI must communicate intermediate states.',
    },
    {
      title: 'Observability',
      text: 'Consumer lag, DLQ depth, processing time and trace ids carried in message headers are essential to operate an event-driven system.',
    },
  ],
  diagram: {
    title: 'Event-Driven Architecture',
    width: 880,
    height: 470,
    nodes: [
      {
        id: 'orderProducer',
        label: 'Order Service',
        caption: 'Producer',
        summary: 'Publishes OrderPlaced events to Kafka.',
        icon: ['fas', 'cube'],
        tone: 'accent',
        x: 8,
        y: 74,
        w: 150,
        h: 64,
      },
      {
        id: 'checkoutProducer',
        label: 'Checkout Service',
        caption: 'Producer',
        summary: 'Sends GenerateInvoice commands to RabbitMQ.',
        icon: ['fas', 'cube'],
        tone: 'accent',
        x: 8,
        y: 280,
        w: 150,
        h: 64,
      },
      {
        id: 'kafka',
        label: 'Apache Kafka',
        caption: 'Topic · partitions · replay',
        summary: 'Durable, ordered event log; consumer groups read at their own pace.',
        icon: ['fas', 'bars-staggered'],
        tone: 'warning',
        x: 240,
        y: 74,
        w: 180,
        h: 64,
      },
      {
        id: 'rabbit',
        label: 'RabbitMQ',
        caption: 'Exchange · queues · acks',
        summary: 'Routes messages to queues; messages are removed once acknowledged.',
        icon: ['fas', 'envelopes-bulk'],
        tone: 'warning',
        x: 240,
        y: 280,
        w: 180,
        h: 64,
      },
      {
        id: 'analytics',
        label: 'Analytics consumer',
        caption: 'Consumer group A',
        summary: 'Builds reporting views from the event stream.',
        icon: ['fas', 'chart-pie'],
        tone: 'info',
        x: 480,
        y: 20,
        w: 170,
        h: 64,
      },
      {
        id: 'notification',
        label: 'Notification consumer',
        caption: 'Consumer group B',
        summary: 'Sends e-mails for the same events, independently of analytics.',
        icon: ['fas', 'bell'],
        tone: 'info',
        x: 480,
        y: 128,
        w: 170,
        h: 64,
      },
      {
        id: 'billing',
        label: 'Billing worker',
        caption: 'Competing consumers',
        summary: 'Generates invoices; several instances share the same queue.',
        icon: ['fas', 'file-invoice'],
        tone: 'info',
        x: 480,
        y: 280,
        w: 170,
        h: 64,
      },
      {
        id: 'retry',
        label: 'Retry queue',
        caption: 'TTL · exponential backoff',
        summary: 'Holds failed messages for a delay before redelivering them.',
        icon: ['fas', 'rotate-right'],
        tone: 'neutral',
        x: 480,
        y: 392,
        w: 170,
        h: 60,
      },
      {
        id: 'dlq',
        label: 'Dead-letter queue',
        caption: 'After max attempts',
        summary: 'Parks messages that keep failing so they can be inspected and reprocessed.',
        icon: ['fas', 'triangle-exclamation'],
        tone: 'danger',
        x: 720,
        y: 392,
        w: 140,
        h: 60,
      },
      {
        id: 'analyticsDb',
        label: 'Reporting store',
        caption: 'Read model',
        summary: 'Query-optimized data built from events.',
        icon: ['fas', 'database'],
        tone: 'success',
        x: 720,
        y: 20,
        w: 140,
        h: 64,
      },
      {
        id: 'observability',
        label: 'Observability',
        caption: 'Lag · DLQ depth · traces',
        summary: 'Monitors consumer lag, failures and end-to-end traces.',
        icon: ['fas', 'chart-line'],
        tone: 'neutral',
        x: 720,
        y: 128,
        w: 140,
        h: 64,
      },
      {
        id: 'billingDb',
        label: 'Billing DB',
        caption: 'Idempotent writes',
        summary: 'Unique keys prevent duplicated invoices when a message is redelivered.',
        icon: ['fas', 'database'],
        tone: 'success',
        x: 720,
        y: 280,
        w: 140,
        h: 64,
      },
    ],
    edges: [
      { from: 'orderProducer', to: 'kafka', mode: 'async', label: 'OrderPlaced' },
      { from: 'checkoutProducer', to: 'rabbit', mode: 'async', label: 'command' },
      { from: 'kafka', to: 'analytics', mode: 'async' },
      { from: 'kafka', to: 'notification', mode: 'async' },
      { from: 'rabbit', to: 'billing', mode: 'async' },
      { from: 'billing', to: 'retry', mode: 'async', label: 'nack' },
      { from: 'retry', to: 'rabbit', mode: 'async', label: 'redeliver after TTL', fromSide: 'left', toSide: 'bottom' },
      { from: 'retry', to: 'dlq', mode: 'async', label: 'exhausted' },
      { from: 'analytics', to: 'analyticsDb', mode: 'sync' },
      { from: 'notification', to: 'observability', mode: 'async', label: 'metrics' },
      { from: 'billing', to: 'billingDb', mode: 'sync', label: 'upsert' },
    ],
  },
  components: {
    orderProducer: {
      responsibility: 'Publishes a fact every time an order is placed, without knowing who will consume it.',
      technologies: ['Java', 'Spring Boot', 'Spring Kafka', 'Transactional outbox'],
      benefits: ['Not blocked by slow consumers.', 'New reactions can be added without changing this service.'],
      tradeOffs: ['Cannot know when all consumers have processed the event.'],
      challenges: ['Guaranteeing the event is published if and only if the transaction commits.', 'Choosing the partition key (e.g. orderId) to keep ordering per order.'],
    },
    checkoutProducer: {
      responsibility: 'Sends a command to a work queue so invoices are generated in the background.',
      technologies: ['Java', 'Spring Boot', 'Spring AMQP'],
      benefits: ['Fast response to the user; heavy work happens asynchronously.'],
      tradeOffs: ['The user sees the invoice only after it is processed.'],
      challenges: ['Publisher confirms to make sure the broker received the message.'],
    },
    kafka: {
      responsibility:
        'Stores events in partitioned, replicated topics. Each consumer group tracks its own offset and can reprocess past events.',
      technologies: ['Apache Kafka', 'Schema Registry (Avro / JSON Schema)'],
      benefits: ['Very high throughput.', 'Replay and multiple independent consumer groups.', 'Ordering guaranteed per partition.'],
      tradeOffs: ['Parallelism is limited by the number of partitions.', 'No per-message routing or priorities.'],
      challenges: ['Partition and retention sizing.', 'Event schema evolution.', 'Rebalancing during deployments.'],
    },
    rabbit: {
      responsibility:
        'Receives messages on exchanges and routes them to queues by binding rules. Messages are deleted after acknowledgement.',
      technologies: ['RabbitMQ', 'Dead-letter exchanges', 'Publisher confirms'],
      benefits: ['Flexible routing (direct, topic, fanout).', 'Per-message acknowledgement and TTL.', 'Great fit for task queues.'],
      tradeOffs: ['No native replay of already consumed messages.', 'Long queues increase memory pressure.'],
      challenges: ['Tuning prefetch and concurrency.', 'Avoiding infinite redelivery loops.'],
    },
    analytics: {
      responsibility: 'Consumes events to build a reporting read model.',
      technologies: ['Spring Kafka', 'Consumer groups'],
      benefits: ['Can be rebuilt from scratch by replaying the topic.'],
      tradeOffs: ['Reports reflect the stream with some delay.'],
      challenges: ['Handling out-of-order events across partitions.'],
    },
    notification: {
      responsibility: 'Reacts to the same events to send notifications, in its own consumer group.',
      technologies: ['Spring Kafka', 'E-mail / push providers'],
      benefits: ['Failures here do not affect analytics or the producer.'],
      tradeOffs: ['Duplicated notifications if idempotency is not handled.'],
      challenges: ['Rate limits of external providers.'],
    },
    billing: {
      responsibility: 'Processes invoice commands; several instances compete for messages on the same queue.',
      technologies: ['Spring AMQP', 'Manual acknowledgements'],
      benefits: ['Scales by adding instances.', 'Failed messages are retried without blocking others.'],
      tradeOffs: ['No global ordering across competing consumers.'],
      challenges: ['Idempotency on redelivery.', 'Separating transient from permanent errors.'],
    },
    retry: {
      responsibility: 'Delays failed messages with a TTL and routes them back to the main queue (exponential backoff).',
      technologies: ['RabbitMQ TTL + dead-letter exchange', 'Spring Retry'],
      benefits: ['Transient failures recover automatically.', 'Protects downstream systems from retry storms.'],
      tradeOffs: ['Adds latency to the failed messages.'],
      challenges: ['Choosing delays and maximum attempts.'],
    },
    dlq: {
      responsibility: 'Keeps messages that exceeded the retry limit for analysis and controlled reprocessing.',
      technologies: ['RabbitMQ dead-letter queue', 'Kafka DLT topic'],
      benefits: ['A poison message never stops the consumer.', 'No silent data loss.'],
      tradeOffs: ['Someone must monitor and act on the DLQ.'],
      challenges: ['Alerting on DLQ depth.', 'Safe reprocessing after the bug is fixed.'],
    },
    analyticsDb: {
      responsibility: 'Stores denormalized data optimized for queries and dashboards.',
      technologies: ['PostgreSQL', 'MongoDB'],
      benefits: ['Fast reads without loading transactional databases.'],
      tradeOffs: ['Data is eventually consistent with the source.'],
      challenges: ['Rebuilding the model when its structure changes.'],
    },
    observability: {
      responsibility: 'Tracks consumer lag, queue depth, error rates and traces propagated in message headers.',
      technologies: ['OpenTelemetry', 'Prometheus', 'Grafana'],
      benefits: ['Detects slow consumers before users notice.'],
      tradeOffs: ['Requires instrumentation in every producer and consumer.'],
      challenges: ['Correlating a business flow across asynchronous hops.'],
    },
    billingDb: {
      responsibility: 'Persists invoices using the message or business key as a unique constraint.',
      technologies: ['Oracle', 'PostgreSQL'],
      benefits: ['Redelivered messages do not create duplicates.'],
      tradeOffs: ['Needs a reliable idempotency key in every message.'],
      challenges: ['Cleaning up processed-message records over time.'],
    },
  },
  assessment: {
    complexity: {
      tendency: 'Higher in flow reasoning',
      context: 'Individual consumers are simple; understanding the whole business flow requires good tracing and documentation.',
    },
    scalability: {
      tendency: 'Very elastic',
      context: 'Queues and partitions absorb peaks; throughput is bounded by partitions, prefetch and downstream capacity.',
    },
    maintainability: {
      tendency: 'Good with stable contracts',
      context: 'Adding consumers is easy; changing event schemas requires versioning and compatibility rules.',
    },
    operations: {
      tendency: 'Moderate to high',
      context: 'Brokers are critical infrastructure; lag, DLQs and retention must be monitored.',
    },
    faultTolerance: {
      tendency: 'Strong decoupling',
      context: 'Consumers can be offline without losing messages, provided retries, DLQs and idempotency are in place.',
    },
    deployment: {
      tendency: 'Independent',
      context: 'Producers and consumers deploy separately as long as event schemas remain compatible.',
    },
  },
};

const bpmn: Architecture = {
  id: 'bpmn',
  name: 'Business Process Management (BPMN)',
  shortName: 'BPMN',
  icon: ['fas', 'diagram-project'],
  tagline: 'Long-running business processes modeled in BPMN 2.0 and orchestrated by a process engine.',
  summary:
    'The business flow is modeled as a BPMN 2.0 diagram and executed by a process engine such as Flowable. The engine persists each process instance, creates human tasks, calls services and decides the path through gateways, while the application code implements the individual steps.',
  whenToUse: [
    'Approval flows and processes with human steps, deadlines and escalations.',
    'Long-running processes that must survive restarts and be audited.',
    'Business rules that change often and benefit from a visual, shared model.',
  ],
  strengths: [
    'The process is explicit and understandable by business and IT.',
    'State is persisted: processes can run for days or months.',
    'Built-in audit history, timers and task management.',
    'Monitoring shows where each instance is and where processes get stuck.',
  ],
  limitations: [
    'Adds an engine and its database to operate.',
    'Versioning running process instances requires planning.',
    'Overkill for simple, short, fully automated flows.',
    'Process logic split between model and code can be hard to test without discipline.',
  ],
  scaling: [
    'Run the engine embedded in Spring Boot services and scale instances horizontally against the same engine database.',
    'Use asynchronous continuations and the job executor for heavy service tasks.',
    'Keep process variables small; store large payloads in the domain database and reference them by id.',
    'Archive or clean up history data to keep the engine database fast.',
  ],
  concepts: [
    {
      title: 'Process orchestration',
      text: 'The engine coordinates the order of steps and persists state at every wait point, instead of the flow being spread across services.',
    },
    {
      title: 'Human tasks',
      text: 'User tasks are assigned to users or groups, appear in a task list and wait until someone completes them, optionally with due dates and escalation.',
    },
    {
      title: 'Service tasks',
      text: 'Automated steps implemented as Java delegates or Spring beans, calling APIs, publishing messages or updating data.',
    },
    {
      title: 'Gateways',
      text: 'Exclusive gateways choose one path based on conditions; parallel gateways split and join concurrent branches.',
    },
    {
      title: 'Process variables',
      text: 'Data carried by each instance and used in conditions and tasks. Keeping them small and typed avoids performance and versioning issues.',
    },
    {
      title: 'Process monitoring',
      text: 'Runtime and history tables show active instances, completed tasks, durations and failed jobs, supporting audits and continuous improvement.',
    },
  ],
  diagram: {
    title: 'BPMN approval process',
    width: 860,
    height: 380,
    nodes: [
      {
        id: 'start',
        label: 'Start',
        caption: 'Request submitted',
        summary: 'Start event: a new request creates a process instance.',
        icon: ['fas', 'circle-play'],
        tone: 'success',
        shape: 'pill',
        x: 16,
        y: 152,
        w: 124,
        h: 60,
      },
      {
        id: 'validate',
        label: 'Validate request',
        caption: 'Service task',
        summary: 'Automated step implemented as a Java delegate.',
        icon: ['fas', 'gears'],
        tone: 'accent',
        x: 180,
        y: 150,
        w: 150,
        h: 64,
      },
      {
        id: 'inbox',
        label: 'Task inbox',
        caption: 'Angular UI',
        summary: 'Where managers claim and complete their tasks.',
        icon: ['fas', 'inbox'],
        tone: 'info',
        x: 370,
        y: 20,
        w: 150,
        h: 60,
      },
      {
        id: 'approval',
        label: 'Manager approval',
        caption: 'User task',
        summary: 'Waits for a person to approve or reject the request.',
        icon: ['fas', 'user-check'],
        tone: 'info',
        x: 370,
        y: 150,
        w: 150,
        h: 64,
      },
      {
        id: 'gateway',
        label: 'Approved?',
        caption: 'Exclusive gateway',
        summary: 'Chooses one path based on the approval decision variable.',
        icon: ['fas', 'code-branch'],
        tone: 'warning',
        shape: 'diamond',
        x: 560,
        y: 150,
        w: 140,
        h: 64,
      },
      {
        id: 'approved',
        label: 'Approved',
        caption: 'End event',
        summary: 'The process finishes on the approval path.',
        icon: ['fas', 'circle-check'],
        tone: 'success',
        shape: 'pill',
        x: 728,
        y: 64,
        w: 124,
        h: 56,
      },
      {
        id: 'rejected',
        label: 'Rejected',
        caption: 'End event',
        summary: 'The process finishes on the rejection path.',
        icon: ['fas', 'circle-xmark'],
        tone: 'danger',
        shape: 'pill',
        x: 728,
        y: 244,
        w: 124,
        h: 56,
      },
      {
        id: 'engine',
        label: 'Flowable engine',
        caption: 'Runtime · history · job executor',
        summary: 'Executes the BPMN model and persists every process instance.',
        icon: ['fas', 'diagram-project'],
        tone: 'accent',
        x: 150,
        y: 300,
        w: 220,
        h: 64,
      },
      {
        id: 'engineDb',
        label: 'Process database',
        caption: 'ACT_* tables',
        summary: 'Stores runtime state, tasks, variables and history.',
        icon: ['fas', 'database'],
        tone: 'success',
        x: 420,
        y: 300,
        w: 170,
        h: 64,
      },
    ],
    edges: [
      { from: 'start', to: 'validate', mode: 'sync' },
      { from: 'validate', to: 'approval', mode: 'sync' },
      { from: 'approval', to: 'gateway', mode: 'sync' },
      { from: 'gateway', to: 'approved', mode: 'sync', label: 'yes' },
      { from: 'gateway', to: 'rejected', mode: 'sync', label: 'no' },
      { from: 'inbox', to: 'approval', mode: 'sync', label: 'complete task' },
      { from: 'engine', to: 'validate', mode: 'async', label: 'executes', fromSide: 'top', toSide: 'bottom' },
      { from: 'engine', to: 'engineDb', mode: 'sync' },
    ],
  },
  components: {
    start: {
      responsibility: 'Starts a new process instance when a request is submitted, usually through a REST call or a message.',
      technologies: ['Flowable RuntimeService', 'BPMN 2.0 start event'],
      benefits: ['Every request gets a traceable instance with its own state.'],
      tradeOffs: ['Initial variables become part of the process contract.'],
      challenges: ['Validating input before starting the instance.'],
    },
    validate: {
      responsibility: 'Runs automated validations and enriches the request, implemented as a Java delegate.',
      technologies: ['Java', 'Spring Boot', 'JavaDelegate', 'Async continuation'],
      benefits: ['Business logic stays in testable Java code.', 'Can be retried by the job executor on failure.'],
      tradeOffs: ['Logic split between model and code must stay consistent.'],
      challenges: ['Idempotency when a failed job is retried.', 'Handling BPMN errors versus technical exceptions.'],
    },
    inbox: {
      responsibility: 'Lists the tasks available to the user or their group and lets them claim and complete them.',
      technologies: ['Angular', 'Flowable REST API / TaskService'],
      benefits: ['One consistent place for people to act on processes.'],
      tradeOffs: ['Requires authorization rules mapped to candidate users and groups.'],
      challenges: ['Rendering task forms that evolve with the process version.'],
    },
    approval: {
      responsibility: 'Waits for a person to decide; the instance stays persisted until the task is completed.',
      technologies: ['BPMN user task', 'Candidate groups', 'Timer boundary event'],
      benefits: ['Supports deadlines, reminders and escalation.', 'Full audit of who decided and when.'],
      tradeOffs: ['Process duration depends on people, not on the system.'],
      challenges: ['Reassignment and delegation rules.', 'Avoiding tasks forgotten in the queue.'],
    },
    gateway: {
      responsibility: 'Evaluates a condition on process variables and follows exactly one outgoing path.',
      technologies: ['Exclusive gateway', 'JUEL expressions'],
      benefits: ['Decisions are visible in the model.'],
      tradeOffs: ['Complex rules in expressions are hard to test; a DMN table or service may be better.'],
      challenges: ['Defining a default flow to avoid stuck instances.'],
    },
    approved: {
      responsibility: 'Ends the instance on the approval path; history keeps the full record.',
      technologies: ['BPMN end event'],
      benefits: ['Clear outcome for reporting and auditing.'],
      tradeOffs: ['Follow-up actions must be modeled before this point.'],
      challenges: ['Triggering notifications reliably.'],
    },
    rejected: {
      responsibility: 'Ends the instance on the rejection path.',
      technologies: ['BPMN end event'],
      benefits: ['Rejections are measurable and auditable.'],
      tradeOffs: ['Rework flows (resubmission) need extra modeling.'],
      challenges: ['Communicating the reason to the requester.'],
    },
    engine: {
      responsibility:
        'Interprets the BPMN model, manages process instances, tasks, timers and asynchronous jobs.',
      technologies: ['Flowable', 'Spring Boot starter', 'Job executor'],
      benefits: ['Durable state, retries and timers out of the box.', 'Process versions deployed side by side.'],
      tradeOffs: ['Another runtime component and database to maintain.'],
      challenges: ['Migrating running instances to new process versions.', 'Monitoring failed jobs.'],
    },
    engineDb: {
      responsibility: 'Holds runtime data (ACT_RU_*), history (ACT_HI_*) and deployed definitions (ACT_RE_*).',
      technologies: ['Oracle', 'PostgreSQL'],
      benefits: ['Transactional consistency between process state and steps.'],
      tradeOffs: ['History tables grow quickly.'],
      challenges: ['History level configuration and clean-up.', 'Indexing for task queries.'],
    },
  },
  assessment: {
    complexity: {
      tendency: 'Moderate',
      context: 'The engine handles state and timers, but teams must learn BPMN semantics and engine behavior.',
    },
    scalability: {
      tendency: 'Scales with the engine database',
      context: 'Engine nodes scale horizontally; the shared database and history volume are the usual limits.',
    },
    maintainability: {
      tendency: 'High for changing processes',
      context: 'Visual models make changes clear, as long as delegates are tested and process versions are managed.',
    },
    operations: {
      tendency: 'Moderate',
      context: 'Requires monitoring of failed jobs, stuck instances and history growth.',
    },
    faultTolerance: {
      tendency: 'Durable by design',
      context: 'State is persisted at every wait point and failed jobs are retried; external side effects still need idempotency.',
    },
    deployment: {
      tendency: 'Versioned processes',
      context: 'New process versions run alongside old ones; changing in-flight instances requires migration.',
    },
  },
};

export const architectures: Architecture[] = [monolith, microservices, eventDriven, bpmn];

export const DEFAULT_ARCHITECTURE: ArchitectureId = 'monolith';

export function findArchitecture(id: string | null | undefined): Architecture | undefined {
  return architectures.find((architecture) => architecture.id === id);
}
