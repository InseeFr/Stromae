#!/bin/sh
echo "window._env_['GENERATE_SOURCEMAP'] = '$GENERATE_SOURCEMAP';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['SKIP_PREFLIGHT_CHECK'] = '$SKIP_PREFLIGHT_CHECK';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['REACT_APP_SURVEY_API_BASE_URL'] = '$REACT_APP_SURVEY_API_BASE_URL';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['REACT_APP_LUNATIC_LOADER_WORKER_PATH'] = '$REACT_APP_LUNATIC_LOADER_WORKER_PATH';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['REACT_APP_LUNATIC_SEARCH_WORKER_PATH'] = '$REACT_APP_LUNATIC_SEARCH_WORKER_PATH';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['REACT_APP_LUNATIC_LABEL_WORKER_PATH'] = '$REACT_APP_LUNATIC_LABEL_WORKER_PATH';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['REACT_APP_SAVING_TIME'] = '$REACT_APP_SAVING_TIME';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['REACT_APP_SAVING_STRATEGY'] = '$REACT_APP_SAVING_STRATEGY';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['REACT_APP_DEFAULT_SURVEY'] = '$REACT_APP_DEFAULT_SURVEY';" >> /usr/share/nginx/html/env-config.js
echo "window._env_['REACT_APP_AUTH_TYPE'] = '$REACT_APP_AUTH_TYPE';" >> /usr/share/nginx/html/env-config.js
exec "$@"