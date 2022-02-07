import { Form, Submit, Input, FormTable } from "./index";
import { __ } from "@wordpress/i18n";
import { useMemo } from "react";

/**
 * TrustedLogin Settings Form
 */
export default function (props) {
  const { team } = props;

  const helpdesk = useMemo(() => {
    return Array.isArray(team.helpdesk) ? team.helpdesk[0] : team.helpdesk;
  }, [team]);
  const noop = () => {};
  const secret = useMemo(() => {
    if (
      helpdesk &&
      team.helpdesk_settings &&
      team.helpdesk_settings.hasOwnProperty(helpdesk)
    ) {
      return team.helpdesk_settings[helpdesk].secret;
    }
    return "";
  }, [team, helpdesk]);

  const callback = useMemo(() => {
    if (
      helpdesk &&
      team.helpdesk_settings &&
      team.helpdesk_settings.hasOwnProperty(helpdesk)
    ) {
      return team.helpdesk_settings[helpdesk].callback;
    }
    return "";
  }, [team, helpdesk]);
  return (
    <>
      <Input
        name="helpscout[secret]"
        label={__("Help Scout Secret Key")}
        value={secret}
        onChange={noop}
        disabled={true}
      />
      <Input
        name="helpscout[callback]"
        label={__("Help Scout Callback URL	")}
        value={callback}
        type="url"
        disabled={true}
        onChange={noop}
      />
    </>
  );
}
