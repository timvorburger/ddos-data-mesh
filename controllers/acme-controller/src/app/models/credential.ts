import { InitialNavigationFeature } from '@angular/router';
import { Initiator, IssuerRole } from '../enums/roles';
import { CredentialState } from '../enums/credential-status';

export type CredentialDefinitionsResponse = {
  credential_definition_ids: string[];
};
export type Credential = {
  referent: string;
  attrs: {
    [key: string]: { name: string };
  };
  schema_id: string;
  cred_def_id: string;
  rev_reg_id: string;
  cred_rev_id: string;
};

export type IndyFilter = {
  cred_def_id: string;
  issuer_did: string;
  schema_id: string;
  schema_issuer_did: string;
  schema_name: string;
  schema_version: string;
};

export type FilterWrapper = {
  indy: IndyFilter;
};

export type CredentialIssueBody = {
  auto_remove: true;
  comment: string;
  connection_id: string;
  credential_proposal: CredentialProposal;
  filter: FilterWrapper;
  trace: boolean;
};

export type Attribute = {
  name: string;
  mimeType?: string;
  value: string;
  selected?: boolean;
  error?: string;
};

export type CredentialProposal = {
  '@type': string;
  attributes: Attribute[];
};

export type CredentialExchangeRecord = {
  credential: {
    schema_id: string;
    cred_def_id: string;
    rev_reg_id: null;
    values: CredentialValues;
    signature: {
      p_credential: {
        m_2: string;
        a: string;
        e: string;
        v: string;
      };
      r_credential: null;
    };
    signature_correctness_proof: {
      se: string;
      c: string;
    };
    rev_reg: null;
    witness: null;
  };
  state: CredentialState;
  credential_proposal_dict: {
    '@type': string;
    '@id': string;
    credential_proposal: {
      '@type': string;
      attributes: Attribute[];
    };
    comment: string;
  };
  auto_remove: true;
  auto_offer: false;
  credential_request: {
    prover_did: string;
    cred_def_id: string;
    blinded_ms: {
      u: string;
      ur: any;
      hidden_attributes: string[];
      committed_attributes: Object;
    };
    blinded_ms_correctness_proof: {
      c: string;
      v_dash_cap: string;
      m_caps: {
        master_secret: string;
      };
      r_caps: Object;
    };
    nonce: string;
  };
  created_at: Date;
  credential_definition_id: string;
  auto_issue: true;
  credential_offer: {
    schema_id: string;
    cred_def_id: string;
    key_correctness_proof: {
      c: string;
      xz_cap: string;
      xr_cap: string[][];
    };
    nonce: string;
  };
  thread_id: string;
  connection_id: string;
  trace: boolean;
  schema_id: string;
  credential_exchange_id: string;
  updated_at: Date;
  role: IssuerRole;
  initiator: Initiator;
};

export type CredentialValues = {
  [key: string]: { raw: string; encoded: string };
};
