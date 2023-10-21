export type Credential = {
  comment: string;
  credential_proposal: CredentialProposal;
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
  mimeType: string;
  value: string;
  selected?: boolean
};

type CredentialProposal = {
  type: string;
  attributes: Attribute[];
};
