import * as React from "react";
import * as QueryString from "query-string";
import { key } from "./key";

const jsonp = require("jsonp-promise");

export interface MeetupProps {
  search: string;
  rsvps: boolean;
}

export interface MeetupState {
  events: MeetupEvent[];
  rsvps: { [key: string]: MeetupRsvp[] };
}

export interface MeetupEvent {
  created: number;
  description: string;
  duration: number;
  how_to_find_us: string;
  id: string;
  link: string;
  local_date: string;
  local_time: string;
  name: string;
  rsvp_limit: number;
  status: string;
  time: number;
  updated: number;
  utf_offset: number;
  yes_rsvp_count: number;
}

export interface MeetupRsvp {
  answers: string[];
  city: string;
  comment: string;
  coord: string;
  country: string;
  created: number;
  event_id: string;
  guests: number;
  id: string;
  link: string;
  lon: string;
  member_id: number;
  name: string;
  photo_url: string;
  response: string;
  state: string;
  updated: string;
  zip: string;
}

export class Meetup extends React.Component<MeetupProps, MeetupState> {
  public state: MeetupState = { events: [], rsvps: {} };

  public componentDidMount(): void {
    this.search(this.props.search);
  }

  public componentWillReceiveProps(nextProps: MeetupProps): void {
    if (
      this.props.search !== nextProps.search ||
      this.props.rsvps !== nextProps.rsvps
    ) {
      this.setState({ rsvps: {}, events: [] });
      this.search(this.props.search);
    }
  }

  private async search(search: string): Promise<void> {
    const params = QueryString.stringify({ sign: true, key });
    const response = await jsonp(
      `https://api.meetup.com/${search}/events?${params}`
    ).promise;

    const events = response.data as MeetupEvent[];

    if (Array.isArray(events)) {
      this.setState({ ...this.state, events });
    }

    if (this.props.rsvps) {
      await Promise.all(
        events.map(async event => {
          const p = QueryString.stringify({
            sign: true,
            key,
            event_id: event.id,
            rsvp: "yes"
          });
          const r = await jsonp(`https://api.meetup.com/rsvps/?${p}`).promise;
          const rsvps = r.results as MeetupRsvp[];
          this.setState({
            ...this.state,
            rsvps: { ...this.state.rsvps, [event.id]: rsvps }
          });
        })
      );
    }
  }

  public render(): JSX.Element | null {
    const { props } = this;

    if (!props.search) {
      return null;
    }

    return (
      <div>
        {this.state.events.map(e => (
          <MeetupEventItem key={e.id} event={e}>
            {(this.props.rsvps ? this.state.rsvps[e.id] || [] : []).map(
              rsvp => (
                <img key={rsvp.id} src={rsvp.photo_url} />
              )
            )}
          </MeetupEventItem>
        ))}
      </div>
    );
  }
}

interface MeetupEventItemProps {
  event: MeetupEvent;
  children?: React.ReactNode;
}

function MeetupEventItem(props: MeetupEventItemProps): JSX.Element {
  return (
    <div>
      <h1>{props.event.name}</h1>
      <details>
        <summary>Description</summary>
        <div dangerouslySetInnerHTML={{ __html: props.event.description }} />
      </details>
      {props.children}
    </div>
  );
}
