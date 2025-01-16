package db;

import java.util.List;

public class PointDAO {
    private DBMotions dbMotions = new DBMotions();

    public PointDAO() {
    }

    public void savePoint(PointModel point) {
        dbMotions.save(point);
    }

    public List<PointModel> findLastFive() {
        return dbMotions.lastFive();
    }
}
