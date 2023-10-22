export type CredentialDefinition = {
  schemaIssuerDid: string;
};

export type CredentialDefinitionsResponse = {
  credential_definition_ids: string[];
};

export type Credential = {
  comment: string;
  credential_proposal: CredentialPreview;
  connection_id: string;
  schema_version: string;
  auto_remove: boolean;
  schema_id: string;
  trace: false;
  schema_issuer_did: string;
  cred_def_id: string;
  issuer_did: string;
  schema_name: string;
};

export type IndyFilter = {
  cred_def_id: string;
  issuer_did: string;
  schema_id: string;
  schema_issuer_did: string;
  schema_name: string;
  schema_version: string;
}

export type FilterWrapper = {
  "indy": IndyFilter
}

export type CredentialIssueBody = {
  auto_remove: true;
  comment: string;
  connection_id: string;
  credential_preview: CredentialPreview
  filter: FilterWrapper;
  trace: boolean;
};

export type CredentialResponse = {
  initiator: string;
  credential_request_metadata: Object;
  auto_issue: boolean;
  credential_exchange_id: string;
  updated_at: Date;
  credential_request: Object;
  raw_credential: Object;
  credential_proposal_dict: Object;
  schema_id: string;
  revocation_id: string;
  credential_offer_dict: Object;
  created_at: Date;
  state: string;
  auto_remove: false;
  auto_offer: false;
  error_msg: string;
  credential: Object;
  role: string;
  connection_id: string;
  parent_thread_id: string;
  credential_definition_id: string;
  trace: true;
  thread_id: string;
  credential_id: string;
  revoc_reg_id: string;
  credential_offer: Object;
};

export type Attribute = {
  name: string;
  mimeType?: string;
  value: string;
  selected?: boolean;
  error?: string;
};

export type CredentialPreview = {
  '@type': string;
  attributes: Attribute[];
};
