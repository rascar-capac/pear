﻿using System;

namespace Pear {

    public class GarbageCollectionGeneration0Manager : MetricsManager {

        private int lastTotalGcCount { get; set; } = 0;

        public GarbageCollectionGeneration0Manager(MetricsManagerConfiguration metricsManager) :
                base(metricsManager) {
        }

        public override float CalculateMetric() {
            int totalGcCount = GC.CollectionCount(0);
            int GcCount = totalGcCount - lastTotalGcCount;
            lastTotalGcCount = totalGcCount;
            return GcCount;
        }
    }
}
