const ReindexUtils = require('./utils/reindex-utils');

/**
 * This plugin allows to manually trigger a ElasticSearch
 * reindex on rest api request.
 * Plugin exposes two endpoints:
 * POST /:entity - schedules next reindex for selected entity
 * GET /:entity - returns current info about reindex status for selected entity
 *
 * @param config
 * @param db
 * @param router
 * @param cache
 * @returns {{ router: Router, route: string, pluginName: string }}
 */
export default ({ config, db, router, cache, apiStatus, apiError }) => {
  /**
     * Schedules reindex for selected entity
     */
  router.post('/:entity', async (req, res) => {
    const { entity } = req.params;
    const context = req.body;

    try {
      ReindexUtils.validateContext(context);
      await ReindexUtils.enqueueReindex(entity, context);
      apiStatus(res, { status: 'enqueued' }, 200);
    } catch (e) {
      const message = e.hasOwnProperty('message') ? e.message : e;
      apiError(res, { message });
    }
  });

  /**
     * Returns info about reindex job
     */
  router.get('/:entity', async (req, res) => {
    const { entity } = req.params;
    const context = req.body;

    try {
      ReindexUtils.validateContext(context);
      const status = await ReindexUtils.getStatus(entity, context);
      apiStatus(res, status, 200);
    } catch (e) {
      const message = e.hasOwnProperty('message') ? e.message : e;
      apiError(res, { message });
    }
  });

  return {
    domainName: '@grupakmk',
    pluginName: 'es-reindex',
    route: '/reindex',
    router
  };
}
