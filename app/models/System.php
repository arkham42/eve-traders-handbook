<?php

class System extends Eloquent {

    protected $table = 'mapSolarSystems';
    protected $primaryKey = 'solarSystemID';

    public function kill()
    {
        return $this->hasMany('Kill');
    }

    public function region()
    {
        return $this->belongsTo('Region', 'regionID');
    }

}
