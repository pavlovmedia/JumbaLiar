export interface modelFilters {
  id?: string;
  label?: string;
  type?: string;
  data?: string;
  profileCreatedByUsername?: string;
  profileUpdatedByUsername?: string;
}

export interface modelPatch {
  id: string;
  data: {
    profileUsername: string;
    label?: string;
    type?: string;
    data?: string;
  };
}

export interface modelCreate {
  profileUsername: string;
  data: {
    label: string;
    type: string;
    data: string;
  };
}

export interface endpointFilters {
  path?: string;
  method?: string;
  hidden?: boolean;
  locked?: boolean;
  endpointCreatedByProfile?: string;
  endpointUpdatedByProfile?: string;
}

export interface endpointPatch {
  id: string;
  data: {
    profileUsername: string;
    path?: string;
    method?: string;
    hidden?: boolean;
    locked?: boolean;
  };
}

export interface endpointCreate {
  profileUsername: string;
  data: {
    path: string;
    method: string;
    hidden: boolean;
    locked: boolean;
  };
}
