module("luci.controller.admin.vzanty", package.seeall)

function index()
    entry({"admin", "status"}, alias("admin", "status", "vzant"), _("Status"), 0).index = true
    entry({"admin", "status", "vzant"}, template("themes/vzant/vzant"), _("Vzant"), 0)
    entry({'admin', 'status', 'vzant', 'addfavourite'}, call('addfavourite'))
    entry({'admin', 'status', 'vzant', 'delfavourite'}, call('delfavourite'))
    entry({'admin', 'status', 'vzant', 'getfavourites'}, call('getfavourites'))
end

function addfavourite()
  local title = string.gsub(luci.http.formvalue("title"), "%s+", "")
  local src = luci.http.formvalue("src")
  local name = os.time()
  --local uci = luci.model.uci.cursor()
  --uci:set('vzant', '@favourite.'..name, 'title', title)
  local executeString = "uci set vzant."..name.."=favourite"
  luci.sys.exec(executeString)

  local titleString = "uci set vzant."..name..".title="..title
  luci.sys.exec(titleString)

  local srcString = "uci set vzant."..name..".src="..src
  luci.sys.exec(srcString)



  luci.sys.exec("uci commit vzant");
  local o = {}
  o['data'] = "ok"
  o['msg'] = name
  luci.http.prepare_content("application/json")
  luci.http.write_json(o)
end

function getfavourites()
    local uci = luci.model.uci.cursor()
    local favourite_table = {}
    uci:foreach(
        'vzant',
        'favourite',
        function(s)
            local e = {}
            e['name'] = s['.name']
            e['title'] = s.title
            e['src'] = s.src
            table.insert(favourite_table, e)
        end
    )
    luci.http.prepare_content('application/json')
    luci.http.write_json(favourite_table)
end




function delfavourite()
  local name = luci.http.formvalue("name")
  local executeString = "uci delete vzant."..name
  luci.sys.exec(executeString)
  luci.sys.exec("uci commit vzant");
  local o = {}
  o['data'] = "ok"
  luci.http.prepare_content("application/json")
  luci.http.write_json(o)
end

